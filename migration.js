require('dotenv').config()

const mysql = require('mysql');
const migrations = require('mysql-migrations');

let connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

migrations.init(connection, __dirname + '/migrations');