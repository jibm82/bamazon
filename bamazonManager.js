const inquirer = require("inquirer");
const LOW_INVENTORY_FACTOR = 5;
let connection = require("./bamazon/connection");
let displayTable = require("./bamazon/displayTable");
let displayProducts = require("./bamazon/displayProducts");

function showMenu() {
  inquirer.prompt({
    type: "list",
    name: "action",
    message: "Select an option",
    choices: [
      {
        name: "View Products for Sale",
        value: "viewProducts"
      },
      {
        name: "View Low Inventory",
        value: "viewLowInventory"
      },
      {
        name: "Add to Inventory",
        value: "addToInventory"
      },
      {
        name: "Add New Product",
        value: "addNewProduct"
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
  viewProducts: () => {
    displayProducts(connection, showMenu);
  },

  viewLowInventory: () => {
    let query = `SELECT a.item_id, a.product_name, b.department_name,
               a.price, a.stock_quantity
               FROM products a INNER JOIN departments b
               ON a.department_id = b.department_id
               WHERE stock_quantity < ?`;

    connection.query(query, LOW_INVENTORY_FACTOR, (err, results, fields) => {
      if (err) {
        return console.log("Error", err);
      }

      if (results.length) {
        displayTable(fields, results);
      } else {
        console.log("There are no products with low inventory");
      }
      showMenu();
    });
  },

  addToInventory: () => {
    connection.query("SELECT item_id, product_name FROM products", (err, products) => {
      if (err) {
        return console.log("Error", err);
      }

      actions.showAddToInventoryMenu(products);
    });
  },
  showAddToInventoryMenu: (products) => {
    let choices = products.map((product) => {
      return { name: product.product_name, value: product }
    });

    inquirer.prompt([
      {
        type: "list",
        name: "product",
        message: "Select a product",
        choices
      },
      {
        name: "quantity",
        message: "How many units do you want to add?"
      }
    ]).then(answers => {
      actions.increaseProductStock(answers.product, answers.quantity);
    });
  },
  increaseProductStock: (product, quantity) => {
    let query = "UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?";
    let params = [quantity, product.item_id];

    connection.query(query, params, (err) => {
      if (err) {
        return console.log("Error", err);
      }

      console.log(`${product.product_name} increased by ${quantity}`);

      showMenu();
    });
  },

  addNewProduct: () => {
    inquirer.prompt([
      {
        name: "product_name",
        message: "What's the name of the product?",
        validate: (product_name) => {
          if (product_name.length) {
            return true;
          } else {
            return "The name is required";
          }
        },
        filter: (product_name) => { return product_name.trim(); }
      },
      {
        name: "department_name",
        message: "What's the name of the department?",
        validate: (department_name) => {
          if (department_name.length) {
            return true;
          } else {
            return "The department is required";
          }
        },
        filter: (department_name) => { return department_name.trim(); }
      },
      {
        name: "price",
        message: "What's the price?",
        validate: (price) => {
          if (price.match(/^[1-9][0-9]*(\.\d{1,2})?$/)) {
            return true;
          } else {
            return "Please write a valid price";
          }
        }
      },
      {
        name: "stock_quantity",
        message: "What's initial stock?",
        validate: (stock_quantity) => {
          if (stock_quantity.match(/^[1-9][0-9]*$/)) {
            return true;
          } else {
            return "Please write a valid quantity";
          }
        }
      }
    ]).then(product => {
      actions.insertProduct(product);
    });
  },
  insertProduct: (product) => {
    connection.query("INSERT INTO products SET ?", product, (err) => {
      if (err) {
        return console.log("Error", err);
      }

      console.log(`${product.product_name} added to products`);

      showMenu();
    });
  },

  exit: () => {
    connection.end();
  }
};

showMenu();