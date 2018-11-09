const displayTable = require("./displayTable");

function displayProducts(connection, callback = undefined) {
  let query = `SELECT a.item_id, a.product_name, b.department_name,
               a.price, a.stock_quantity
               FROM products a INNER JOIN departments b
               ON a.department_id = b.department_id`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      return console.log("Error", err);
    }

    displayTable(fields, results);
    if (typeof callback === "function") {
      callback(results);
    }
  });
}

module.exports = displayProducts;