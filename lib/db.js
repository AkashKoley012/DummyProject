const mysql = require("mysql");

require("dotenv").config();

//todo Create connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

//todo Connect
db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

module.exports = db;
