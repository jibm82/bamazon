const CFonts = require('cfonts');
const connection = require("./bamazon/connection");
const displayTable = require("./bamazon/displayTable");
const inquirer = require("inquirer");
const printMessage = require("print-message");

function showMenu() {
  inquirer.prompt({
    type: "list",
    name: "action",
    message: "Select an option",
    choices: [
      {
        name: "View Product Sales by Department",
        value: "viewDepartmentSales"
      },
      {
        name: "Create New Department",
        value: "createDepartment"
      },
      {
        name: "Exit",
        value: "exit"
      },
    ]
  }).then(answers => {
    actions[answers.action]();
  });
}

let actions = {
  viewDepartmentSales: () => {
    let query = `SELECT departments.department_id, department_name, over_head_costs,
                   SUM(IFNULL(product_sales,0)) as product_sales,
                   (SUM(IFNULL(product_sales,0) - over_head_costs)) as total_profit
                 FROM departments LEFT JOIN products
                 ON departments.department_id = products.department_id
                 GROUP BY departments.department_id`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        return console.log("Error", err);
      }

      if (results.length) {
        displayTable(fields, results);
      } else {
        printMessage(["There are no departments"]);
      }
      showMenu();
    });
  },

  createDepartment: () => {
    inquirer.prompt([
      {
        name: "department_name",
        message: "What's the name of the department?",
        validate: (department_name) => {
          if (department_name.length) {
            return true;
          } else {
            return "The name is required";
          }
        },
        filter: (department_name) => { return department_name.trim(); }
      },
      {
        name: "over_head_costs",
        message: "What's the over head cost?",
        validate: (over_head_costs) => {
          if (over_head_costs.match(/^[1-9][0-9]*(\.\d{1,2})?$/)) {
            return true;
          } else {
            return "Please write a valid value";
          }
        }
      }
    ]).then(department => {
      actions.insertDepartment(department);
    });
  },
  insertDepartment: (department) => {
    connection.query("INSERT INTO departments SET ?", department, (err) => {
      if (err) {
        return console.log("Error", err);
      }

      printMessage([`${department.department_name} added to departments`]);

      showMenu();
    });
  },

  exit: () => {
    connection.end();
  }
};

CFonts.say('Bamazon');
showMenu();