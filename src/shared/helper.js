const EventTypes = require('../config/enums');
const faker = require('faker');
const pool = require('../config/db');

const user_ids = [86, 135, 242, 15, 169, 25, 194, 241, 148, 199, 34, 201, 168, 91, 43, 152, 208, 140, 192, 216, 62, 179, 88, 191, 193, 33, 173, 87, 161, 234, 5, 157, 178, 76, 106, 77, 89, 80, 213, 190, 137, 55, 239, 98, 3, 45, 172, 123, 78, 74, 47, 35, 159, 114, 40, 133, 236, 212, 200, 79, 102, 188, 10, 117, 84, 69, 92, 254, 131, 245, 259, 184, 111, 240, 182, 104, 164, 186, 232, 144, 158, 97, 238, 53, 249, 181, 209, 139, 38, 46, 258, 4, 132, 71, 183, 189, 195, 218, 156, 244, 30, 204, 227, 215, 39, 115, 109, 28, 142, 7, 248, 73, 149, 257, 206, 31, 214, 12, 170, 105, 176, 37, 250, 141, 198, 175, 23, 127, 99, 24, 252, 128, 177, 246, 19, 56, 6, 203, 187, 60, 9, 16, 8, 13, 113, 205, 65, 96, 18, 174, 130, 180, 94, 61, 260, 155, 151, 17, 66, 138, 235, 85, 110, 108, 36, 129, 52, 154, 221, 82, 21, 125, 48, 64, 22, 2, 120, 145, 72, 228, 81, 147, 57, 225, 219, 162, 100, 58, 165, 229, 196, 210, 49, 118, 233, 220, 27, 54, 126, 44, 68, 116, 136, 223, 247, 26, 112, 231, 32, 207, 107, 255, 50, 230, 171, 160, 197, 41, 121, 146, 67, 14, 93, 103, 256, 1, 70, 150, 153, 224, 226, 59, 211, 143, 90, 251, 29, 163, 63, 202, 119, 237, 134, 11, 253, 185, 75, 217, 243, 166, 167, 124, 42, 95, 51, 101, 20, 222, 122, 83]


function getEnteredValue(arr, id, event_type) {
    if (event_type == EventTypes.ADD) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].attr_id == id) {
                return JSON.parse(arr[i].entered_value);
            }
        }
    } else if (event_type == EventTypes.DELETE) {

    }

    return null;

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

function generateRoleVisits(callback) {

    // let query = `INSERT INTO user_nav
    // (user_id,
    // role_id,
    // visited_route_id,
    // time_spent_per_visit,
    // platform_visit,
    // VALUES
    // (?,?,?,?,?,?,?,?)`;


    let query = `INSERT INTO user_nav
    (user_id,
    role_id,
    visited_route_id,
    time_spent_per_visit,
    platform_visit)
    VALUES
    (?,?,?,?,?)`;

    let routesArray = shuffleArray([18,20, 22, 21, 16,23, 19, 24,18]);
    for (let i = 0; i < 1000; i++) {

        let values = [randomUNumber(user_ids), 13, getRandomWeightedNumber(routesArray), randomUNumber([1, 2, 3]), 1];
        pool.query(query, values, (error, result) => {
            if (error) return callback(error, 'Error ');

            if (i == 999) {
                return callback(null, result)
            }
        })


    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function updateRoleVisits(callback) {

    // time_spent_per_visit,
    // platform_visit,
    // total_time_spent_per_role,
    // number_of_logins,
    // days_since_creation)
    // VALUES
    // (?,?,?,?,?,?,?,?)`;


    let query = `UPDATE user_nav SET `;

    pool.query(query, values, (error, result) => {
        if (error) return callback(error, 'Error ');
        // return callback(null, result)
    })
}
function getRandomWeightedNumber(array) {
    // Calculate weights based on the index with reduced exponential decay
    const weights = array.map((_, index) => 1 / Math.pow(1.2, index));

    // Calculate the total weight
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Generate a random value between 0 and the total weight
    const randomValue = Math.random() * totalWeight;

    // Find the index corresponding to the random value
    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
            return array[i];
        }
    }

    // This should not be reached, but return the last element if it does
    return array[array.length - 1];
}


function randomUNumber(array) {

    if (array.length === 0) {
        return undefined; // Return undefined for an empty array
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


module.exports = { getEnteredValue, generateRoleVisits }