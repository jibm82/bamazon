const CFonts = require('cfonts');
const connection = require("./bamazon/connection");
const displayProducts = require("./bamazon/displayProducts");
const inquirer = require("inquirer");
const printMessage = require("print-message");

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
  let total = parseFloat(product.price * quantity).toFixed(2);
  let query = `UPDATE products
               SET stock_quantity = (stock_quantity - ?),
               product_sales = (product_sales + ?)
               WHERE item_id = ?`;
  let params = [quantity, total, product.item_id];

  connection.query(query, params, (err) => {
    if (err) {
      return console.log("Error", err);
    }

    displayTotalCost(product, quantity, total);
    connection.end();
  });
}

function displayTotalCost(product, quantity, total) {
  let formattedTotal = Intl.NumberFormat().format(total)

  printMessage([
    `You purchased ${quantity} - ${product.product_name}`,
    `Your total is $${formattedTotal}`,
    "Thanks for shopping with us"
  ]);
}

CFonts.say('Bamazon');
displayProducts(connection, showPurchaseMenu);