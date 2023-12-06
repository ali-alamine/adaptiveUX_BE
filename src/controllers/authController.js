const authModel = require('../models/authModel');

function login(req, res) {
    const data = req.body;
    authModel.login(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    })
}

function getUserRoles(req, res) {
    authModel.getUserRoles((error, result) => {
        if (error) return res.status(500).send(error);

        return res.json(result)
    })
}

function signUp(req, res) {

    authModel.signUp(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

module.exports = {
    login,
    signUp,
    getUserRoles
}