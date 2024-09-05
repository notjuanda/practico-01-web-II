const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = app => {
    let router = require("express").Router();
    const hamburguesaController = require("../controllers/hamburguesa.controller");

    router.get("/create", isAuthenticated, hamburguesaController.renderCreateHamburguesa);
    router.post("/create", isAuthenticated, hamburguesaController.createHamburguesa);

    router.get("/", hamburguesaController.listHamburguesas);

    app.use('/hamburguesas', router);
};
