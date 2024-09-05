const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = app => {
    let router = require("express").Router();
    const reviewController = require("../controllers/review.controller");

    router.get("/create", isAuthenticated, reviewController.renderCreateReview);

    router.post("/create", isAuthenticated, reviewController.createReview);

    router.get("/", reviewController.listReviews);

    app.use('/reviews', router);
};
