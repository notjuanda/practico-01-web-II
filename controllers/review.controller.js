const db = require("../models");
const Review = db.reviews;

exports.renderCreateReview = (req, res) => {
    res.render('reviews/create', { title: "Crear Review" });
};

exports.createReview = async (req, res) => {
    try {
        const { puntuacion, comentario, hamburguesaId, usuarioId } = req.body;
        await Review.create({
            puntuacion,
            comentario,
            hamburguesaId,
            usuarioId
        });
        res.redirect('/reviews');
    } catch (error) {
        console.error("Error al crear review:", error);
        res.status(500).send("Error al crear review.");
    }
};

exports.listReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: ["hamburguesa", "usuario"]
        });
        res.render('reviews/list', { title: "Lista de Reviews", reviews });
    } catch (error) {
        console.error("Error al listar reviews:", error);
        res.status(500).send("Error al listar reviews.");
    }
};
