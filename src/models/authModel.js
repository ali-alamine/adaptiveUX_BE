const pool = require('../config/db');

function login(user, callback) {
    const loginQuery = `SELECT * FROM user u LEFT JOIN user_role ur on u.role_id = ur.role_id 
    WHERE u.username = '${user.username}' AND u.password_hash = '${user.password}'`;

    pool.query(loginQuery, (error, result) => {
        if (error) {
            return callback(error, 'Erorr login');
        } else {
            return callback(null, { user: result });
        }
    })
}

module.exports = {
    login
}