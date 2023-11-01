const customerModel = require('../models/customerModel');

function getCustomers(req, res) {
    customerModel.getCustomers(req.body, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error.message);
            res.status(500).send('Error executing the query.');
            return;
        }
        res.json(results);
    });
}

function deleteCustomer(req, res) {
    const customerId = req.query.person_id;
    customerModel.deleteCustomer(customerId, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error.message);
            res.status(500).send('Error executing the query.');
            return;
        }
        res.json(results);
    });
}
function pinCustomer(req, res) {
    const customerId = req.query.person_id;
    customerModel.pinCustomer(customerId, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error.message);
            res.status(500).send('Error executing the query.');
            return;
        }
        res.json(results);
    });
}
function unPinCustomer(req, res) {
    const customerId = req.query.person_id;
    customerModel.unPinCustomer(customerId, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error.message);
            res.status(500).send('Error executing the query.');
            return;
        }
        res.json(results);
    });
}

function addCustomer(req, res) {
    let customer_data = req.body;
    customerModel.addNewCustomer(customer_data, 'customer', (error, results) => {
        if (error) {
            console.error('Error executing the query:', error.message);
            res.status(500).send('Error executing the query.');
            return;
        } else {
            res.json(results);
        }
    });
}

module.exports = {
    getCustomers,
    deleteCustomer,
    pinCustomer,
    unPinCustomer,
    addCustomer,
};
// {
//     first_name: 'Ali',
//     last_name: 'Al Amine',
//     phone: '07474848',
//     email: 'ali.alamine@gmail.com',
//     address: '2A',
//     city: 'Sunderland',
//     job_title: 'software developer',
//     notes: 'this is a short note ',
//     postal_code: 'SR47DY'
//   }