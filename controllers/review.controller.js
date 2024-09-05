const db = require("../models");
const Review = db.reviews;

exports.renderCreateReview = async (req, res) => {
    const hamburguesaId = req.query.hamburguesaId;  
    const usuarioId = req.session.usuarioId; 

    if (!hamburguesaId) {
        return res.status(400).send("Falta el ID de la hamburguesa.");
    }

    const review = await Review.findOne({
        where: {
            hamburguesaId,
            usuarioId,
            comioHamburguesa: true,
            puntuacion: { [db.Sequelize.Op.not]: null },
            comentario: { [db.Sequelize.Op.not]: null }
        }
    });

    if (review) {
        return res.status(403).send("Ya has dejado una reseña para esta hamburguesa.");
    }

    res.render('reviews/create', { 
        title: "Crear Review", 
        hamburguesaId, 
        usuarioId 
    });
};

exports.createReview = async (req, res) => {
    try {
        const { puntuacion, comentario } = req.body;
        const hamburguesaId = req.body.hamburguesaId; 
        const usuarioId = req.session.usuarioId;  
        
        if (!hamburguesaId || !usuarioId) {
            return res.status(400).send("Falta el ID de la hamburguesa o del usuario.");
        }

        const review = await Review.findOne({
            where: {
                hamburguesaId,
                usuarioId,
                comioHamburguesa: true 
            }
        });

        if (!review) {
            return res.status(404).send("No se encontró la reseña para actualizar.");
        }

        review.puntuacion = puntuacion;
        review.comentario = comentario;
        await review.save();

        res.redirect(`/hamburguesas/${hamburguesaId}/reviews`);
    } catch (error) {
        console.error("Error al actualizar review:", error);
        res.status(500).send("Error al actualizar review.");
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

exports.listReviewsForHamburguesa = async (req, res) => {
    try {
        const hamburguesaId = req.params.id;

        const reviews = await Review.findAll({
            where: { hamburguesaId },
            include: ["hamburguesa", "usuario"]
        });

        res.render('reviews/list', { 
            title: "Reseñas de la hamburguesa",
            reviews 
        });
    } catch (error) {
        console.error("Error al listar las reseñas de la hamburguesa:", error);
        res.status(500).send("Error al listar las reseñas.");
    }
};

