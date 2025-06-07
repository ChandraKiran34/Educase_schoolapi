// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL database');
// });

// module.exports = connection;


// // GET /api/listSchools?latitude=17.4&longitude=78.5
// // 

// database.js
const mysql = require('mysql2/promise'); // ✅ use promise-based pool
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
