const Table = require("cli-table3");

function displayTable(fields, results) {
  let table = new Table({
    head: fields.map((field) => { return field.name })
  });

  results.forEach((result) => {
    table.push(Object.values(result));
  })

  console.log(table.toString());
}

module.exports = displayTable;