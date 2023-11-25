const pool = require('../config/db');

function submitUserFeedback(callback) {

  const query = `INSERT INTO user`;

  pool.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  submitUserFeedback,
};
