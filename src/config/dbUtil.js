const { pool } = require('./db');

// Function to get table columns
function getTableColumns(tableName, callback) {
    const query = `SHOW COLUMNS FROM ${tableName}`;
    pool.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const columns = results.map((row) => row.Field);
        callback(null, columns);
    });
}

// Function to add a record to a table
function addRecord(tableName, record, callback) {
    const query = `INSERT INTO ${tableName} SET ?`;
    pool.query(query, record, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}


// Function to select all records from a table with optional sorting and limiting
function SelectAll(tableName, callback, limit = 100, orderBy = 'DESC') {
    const query = 'SELECT * FROM ?? ORDER BY customer_id ?? LIMIT ?';
    const params = [tableName, orderBy, limit];
  
    pool.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
  
  module.exports = { getTableColumns, addRecord, SelectAll };