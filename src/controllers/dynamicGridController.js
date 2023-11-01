const dynamicGridModel = require('../models/dynamicGridModel');

function addGridRecord(req, res) {
    let data = req.body;
    dynamicGridModel.addGridRecord(data, (error, result) => {
        if (error) return res.status(500).send(error);

        res.json(result)
    })
}

function fetchGridRecords(req, res) {
    let data = req.body;
    dynamicGridModel.fetchGridRecords(data, (error, result) => {
        if (error) return res.status(500).send(error);

        res.json(result);
    })
}
function handleAction(req, res) {
    let data = req.body;
    dynamicGridModel.handleAction(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    });
}
function deleteRecord(req, res) {
    let data = req.query.entityID;
    dynamicGridModel.deleteRecord(data, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    })
}
function fetchAttributeValue(req, res) {
    let data = req.body;
    dynamicGridModel.fetchAttributeValue(data, (error, result) => {
        if (error) return res.status(500).send(error);

        res.json(result);
    })
}
module.exports = {
    addGridRecord,
    fetchGridRecords,
    deleteRecord,
    handleAction,
    fetchAttributeValue
}