const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = app => {
    let router = require("express").Router();
    const lugarController = require("../controllers/lugar.controller");

    router.get("/create", isAuthenticated, lugarController.renderCreateLugar);

    router.post("/create", isAuthenticated, lugarController.createLugar);

    router.get("/", lugarController.listLugares);

    app.use('/lugares', router);
};
