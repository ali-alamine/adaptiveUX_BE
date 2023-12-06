const pool = require('../config/db');
const helper = require('../shared/helper')
const faker = require('faker');
const userStyleModel = require('../models/styleModel');
const axios = require('axios');

function login(user, callback) {
    // predictUserNav();
    // return;
    const loginQuery = `SELECT * FROM user u LEFT JOIN user_role ur on u.role_id = ur.role_id 
    WHERE u.username = '${user.username}' AND u.password_hash = '${user.password}'`;

    pool.query(loginQuery, (error, result) => {
        if (error) {
            return callback(error, 'Erorr login');
        } else {
            userStyleModel.getUserStyle(result, (error, userStyles) => {
                if (error) return callback(error, 'Erorr fetching user style');
                return callback(null, { user: { user_data: result, styles: userStyles } });
            })
        }
    })
}

function getUserRoles(callback) {
    const queryRole = 'SELECT role_id, role_name from user_role';
    pool.query(queryRole, (error, roles) => {
        if (error) return callback(error, null);

        return callback(null, roles)
    })
}

function createFakeUser() {
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

function signUp(user, callback) {
    let query = 'INSERT INTO user (role_id, username, password_hash, email) VALUES (?,?,?,?)';
    let values = [user.role_id, user.username, user.password, user.email];
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null);
        // let styleQuery = `INSERT INTO user_style (user_id,style_type_id,user_style_feedback) values (${result.insertId},8,1),(${result.insertId},5,1)`;

        let styleQuery = `INSERT INTO user_style (user_id, style_type_id, user_style_feedback)
        SELECT 
        ${result.insertId} AS user_id, 
        style_type_id, 
        CASE WHEN style_type_id in(5,8) THEN 1 ELSE 0 END AS user_style_feedback
        FROM user_style_type`;

        pool.query(styleQuery, (error, result) => {
            if (error) return callback(error, null);

            return callback(null, 'User registered successfully')
        })
    })
}

async function predictUserNav() {
    try {
        // Example data for prediction
        const new_data = {
            user_id: 2,
            role_id: 9,
            visited_route_id: 24, //18 => 3,20 => 4.9, 22 => 7, 21 => 5.9, 16 => 1,23 => 7.9, 19 => 4, 24 =>8.9
            time_spent_per_visit: 1,
            platform_visit: 1,
        };

        // Make a POST request to the Flask server
        const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', new_data);

        // Check if flaskResponse.data is defined
        if (flaskResponse.data) {
            // Extract the predictions from the Flask response
            const predictions = flaskResponse.data.predictions;

            // Return the predictions from the Express server
            console.log({ predictions });
        } else {
            console.error("Unexpected response format from Flask server");
        }
    } catch (error) {
        console.error("Error making request to Flask server:", error.message);
    }
}

module.exports = {
    login,
    getUserRoles,
    signUp
}