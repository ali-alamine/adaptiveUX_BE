const styleModel = require('../models/styleModel');

function submitUserFeedback(req, res) {
    const data = req.body;
    styleModel.submitUserFeedback(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    })
}

function getUserStyle(req, res) {
    const data = req.data;
    styleModel.getUserStyle(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result)
    })
}

module.exports = {
    submitUserFeedback,
    getUserStyle
}