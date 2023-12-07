const { app } = require('faker/lib/locales/en');
const appDashboardModel = require('../models/appDashboardModel');

function getDashboardRoutes(req, res) {
    appDashboardModel.getDashboardRoutes(req, (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
    })
}

function addNewRoute(req, res) {
    appDashboardModel.addNewRoute(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function addContent(req, res) {
    appDashboardModel.addContent(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result)
    })
}

function getContnentType(req, res) {
    appDashboardModel.getContnentType(req, (error, result) => {
        if (error) res.status(500).send(error);
        return res.json(result);
    })
}


function getContnents(req, res) {
    appDashboardModel.getContnents(req, (error, result) => {
        if (error) res.status(500).send(error);
        return res.json(result);
    })
}

function linkRouteWithContent(req, res) {
    appDashboardModel.linkRouteWithContent(req.body, (error, result) => {
        if (error) res.status(500).send(error);
        return res.json(result);
    })
}

function getRouteContent(req, res) {
    appDashboardModel.getRouteContent(req, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function getAttributeTypes(req, res) {
    appDashboardModel.getAttributeTypes(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function getContentAttributes(req, res) {
    appDashboardModel.getContentAttributes(req.query, (error, result) => {
        if (error) res.status(500).send(error);
        return res.json(result);
    })
}
function addContentAttr(req, res) {
    appDashboardModel.addContentAttr(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function addAction(req, res) {
    appDashboardModel.addAction(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function getActions(req, res) {
    appDashboardModel.getActions(req, (error, result) => {
        if (error) res.sta(500).send(error);
        return res.json(result);
    })
}

function addContentAction(req, res) {
    appDashboardModel.addContentAction(req.body, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

function getContentActions(req, res) {
    appDashboardModel.getContentActions(req.query, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.json(result);
    })
}

module.exports = {
    getDashboardRoutes,
    addNewRoute,
    getContnents,
    getContnentType,
    linkRouteWithContent,
    getRouteContent,
    getAttributeTypes,
    getContentAttributes,
    addContentAttr,
    addContent,
    addAction,
    getActions,
    addContentAction,
    getContentActions,
}