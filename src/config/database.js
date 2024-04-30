// require('dotenv').config();
// const mysql = require('mysql2');

// // Create a connection pool using environment variables
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// // Testing the connection and handling the promise
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Failed to connect to the database: ', err);
//     return;
//   }
//   console.log('Connected to the database successfully!');
//   connection.release();
// });

// module.exports = pool.promise();

// const { Pool } = require('pg');
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// module.exports = pool;

require('dotenv').config();
const { Pool } = require('pg');

// SSL configuration
const sslConfig = {
  rejectUnauthorized: false,
};

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: sslConfig,
});

module.exports = pool;
