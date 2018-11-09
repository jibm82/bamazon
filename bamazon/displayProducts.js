const displayTable = require("./displayTable");

function displayProducts(connection, callback = undefined) {
  connection.query("SELECT * FROM products", (err, results, fields) => {
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