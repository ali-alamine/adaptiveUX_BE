const pool = require('../config/db');
const authModel = require('../models/authModel');
function submitUserFeedback(data, callback) {
    console.log(data, 'dataa');

    const UpdateQuery = `UPDATE user_style SET user_style_feedback = ${data?.feedback} WHERE user_id = ${data.user_id} AND style_type_id = ${data.style_type_id}`;

    const userData = [{ 'user_id': data?.user_id }];

    pool.query(UpdateQuery, (error, results) => {
        if (error) {
            return callback(error, null);
        } else {
            let toggleQuery = '';

            if (data.feedback == 2) {
                toggleQuery = `UPDATE user_style SET user_style_feedback = -1 WHERE user_id = ${data?.user_id} 
                AND style_type_id in (select style_type_id from user_style_type where style_type = '${data.type}') 
                AND user_style_feedback != 2`;
            } else {

                toggleQuery = `UPDATE user_style SET user_style_feedback = 1 WHERE user_id = ${data?.user_id} 
                AND style_type_id in (select style_type_id from user_style_type where style_type = '${data.type}') 
                AND user_style_feedback = 0 LIMIT 1`;
            }


            pool.query(toggleQuery, (error, res) => {
                if (error) return callback(error);
                const getUserQuery = `SELECT * FROM user u LEFT JOIN user_role ur on u.role_id = ur.role_id 
                WHERE u.user_id = '${data?.user_id}'`
                pool.query(getUserQuery, (error, user) => {
                    if (error) return callback(error, null);
                    else {
                        getUserStyle(userData, (error, userStyles) => {
                            if (error) {
                                return callback(error);
                            }
                            return callback(null, { user: { user_data: user, styles: userStyles } });
                        });
                    }
                })
            })
        }

    });
}

function getUserStyle(req, callback) {
    // consider making a random selection instead of selecting by user_id;
    const user_id = req[0].user_id;
    const query = `SELECT us.user_id, us.user_style_feedback, ust.style_type_id, ust.style_class, usEl.style_element_name, ust.style_type
    FROM user_style us 
    LEFT JOIN user_style_type ust ON us.style_type_id = ust.style_type_id
    LEFT JOIN user_style_element usEl ON usEl.style_element_id = ust.style_element_id 
    WHERE us.user_style_feedback = 1 OR us.user_style_feedback = 2 AND us.user_id = ${user_id}`;

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
