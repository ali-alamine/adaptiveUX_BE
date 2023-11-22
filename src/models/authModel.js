const pool = require('../config/db');
const helper =  require('../shared/helper')
const faker = require('faker');
function login(user, callback) {

    // helper.generateRoleVisits(callback)
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

function createUser() {
    let query = 'INSERT INTO user (role_id, username, password_hash, email) VALUES (?,?,?,?)';
    for (let i = 0; i < 260; i++) {
        let role_id = faker.datatype.number({ min: 1, max: 13 });
        let username = faker.internet.userName();
        let values = [role_id, username, username, faker.internet.email()]
        pool.query(query, values, (error, result) => {
            if (error) return 0;

        })
    }
}

module.exports = {
    login
}