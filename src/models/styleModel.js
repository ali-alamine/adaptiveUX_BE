const pool = require('../config/db');

function submitUserFeedback(callback) {
    // element_id
    // style_type_id
    // feedback val 1 -> thumb-up, 0-> thumb-down

    const query = `INSERT INTO user`;

    pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}

function getUserStyle(req, callback) {
    // consider making a random selection instead of selecting by user_id;
    const user_id = req.user_id;
    const query = `SELECT us.user_id,us.user_style_feedback, ust.style_type_id, ust.style_class, usEl.style_element_name FROM user_style us 
    JOIN user_style_type ust on us.style_type_id = ust.style_type_id
    JOIN user_style_element usEl on usEl.style_element_id = ust.style_element_id 
    WHERE us.user_id = ${user_id}`;

    pool.query(query, (error, res) => {
        if (error) {
            return callback(error, null);
        }

        return callback(null, res)
    })
}

module.exports = {
    submitUserFeedback,
    getUserStyle
};
