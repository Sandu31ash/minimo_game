const mysql = require("mysql2/promise"); // promise version

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("MySQL Pool created");


// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "minimo_db"
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected");
// });

// module.exports = db;
