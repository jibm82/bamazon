require('dotenv').config();

const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table3");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

function displayTable(fields, results) {
  let table = new Table({
    head: fields.map((field) => { return field.name })
  });

  results.forEach((result) => {
    table.push(Object.values(result));
  })

  console.log(table.toString());
}

function displayProducts() {
  connection.query("SELECT * FROM products", (err, results, fields) => {
    if (err) {
      return console.log("Error", err);
    }

    displayTable(fields, results);
    showPurchaseMenu(results);
  });
}

function validateItemId(item_id, products) {
  return products.some((product) => { return product.item_id == item_id });
}

function validateStockAvailability(quantity, product) {
  return product.stock_quantity >= quantity;
}

function showPurchaseMenu(products) {
  let selectedProduct = undefined;

  inquirer.prompt([
    {
      name: "item_id",
      message: "Which product do you want to buy? (Write the Id)",
      validate: (item_id) => {
        if (validateItemId(item_id, products)) {
          return true;
        } else {
          return "Invalid Id, please write a valid Id.";
        }
      }
    },
    {
      name: "quantity",
      message: "How many units do you want to buy?",
      validate: (quantity, answers) => {
        if (!quantity.match(/^[1-9][0-9]*$/)) {
          return "Please write a valid quantity.";
        }

        let item_id = answers.item_id;
        selectedProduct = products.find((product) => { return product.item_id == item_id; });

        if (validateStockAvailability(quantity, selectedProduct)) {
          return true;
        } else {
          return `Insufficient stock, only ${selectedProduct.stock_quantity} available.`;
        }
      }
    }
  ]).then(answers => {
    let quantity = parseInt(answers.quantity);
    persistPurchase(selectedProduct, quantity);
  });
}

function persistPurchase(product, quantity) {
  let query = "UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE item_id = ?";
  let params = [quantity, product.item_id];
  connection.query(query, params, (err) => {
    if (err) {
      return console.log("Error", err);
    }

    displayTotalCost(product, quantity);
    connection.end();
  });
}

function displayTotalCost(product, quantity) {
  let total = parseFloat(product.price * quantity).toFixed(2);
  let formattedTotal = Intl.NumberFormat().format(total)
  console.log(`You purchased ${quantity} - ${product.product_name}`);
  console.log(`Your total is $${formattedTotal}`);
  console.log("Thanks for shopping with us");
}

displayProducts();

