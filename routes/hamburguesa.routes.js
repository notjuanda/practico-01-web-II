const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = app => {
    let router = require("express").Router();
    const hamburguesaController = require("../controllers/hamburguesa.controller");
    const reviewController = require("../controllers/review.controller");

    router.get("/create", isAuthenticated, hamburguesaController.renderCreateHamburguesa);
    router.post("/create", isAuthenticated, hamburguesaController.createHamburguesa);

    router.get("/", hamburguesaController.listHamburguesas);

    router.post("/:id/eat", isAuthenticated, hamburguesaController.markAsEaten);

    router.get("/:id/reviews", reviewController.listReviewsForHamburguesa);

    app.use('/hamburguesas', router);
};
