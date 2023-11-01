<<<<<<< HEAD
const mysql = require('mysql2');
=======
const mysql = require('mysql');
>>>>>>> 51a48c526348877f506881957c0087dea1666080

// Database configuration for connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'pulse_core',
});

// Test the connection pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }

  connection.release(); // Release the connection back to the pool

  console.log('Connected to the database pool!');
});

module.exports = pool;
