const authModel = require('../models/authModel');

function login(req, res) {
    const data = req.body;
    authModel.login(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    })
}

module.exports = {
    login
}