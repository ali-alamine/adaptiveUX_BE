const pool = require('../config/db');
const dbUtil = require('../config/dbUtil');
const personModel = require('../models/personModel');
const person_type = 'customer';

function getCustomers(req, callback) {
  personModel.fetchPerson(req, person_type, callback)
}

function deleteCustomer(personId, callback) {
  personModel.deletePerson(personId, person_type, callback);
}

function pinCustomer(personId, callback) {
  personModel.pinPerson(personId, person_type, callback);
}

function unPinCustomer(personId, callback) {
  personModel.unPinPerson(personId, person_type, callback);
}

function addNewCustomer(customerData, person_type, callback) {
  customerData.person_type = person_type
  personModel.addNewPerson(customerData, callback);
}

module.exports = {
  getCustomers,
  addNewCustomer,
  deleteCustomer,
  pinCustomer,
  unPinCustomer,
};