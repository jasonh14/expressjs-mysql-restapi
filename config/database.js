const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "notes_app",
  })
  .promise();

module.exports = pool;
