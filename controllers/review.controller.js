const db = require('../models');
const Review = db.Review;
const HamburguesaComida = db.HamburguesaComida;

// Crear un review si el usuario ha marcado que comió la hamburguesa
exports.crearReviewPost = async (req, res) => {
    const { puntuacion, comentario } = req.body;
    const hamburguesaId = req.params.id;

    try {
        const comioHamburguesa = await HamburguesaComida.findOne({
            where: { usuario_id: req.session.usuarioId, hamburguesa_id: hamburguesaId }
        });

        if (comioHamburguesa) {
            await Review.create({
                puntuacion,
                comentario,
                usuario_id: req.session.usuarioId,
                hamburguesa_id: hamburguesaId
            });
            res.redirect(`/hamburguesas/${hamburguesaId}/reviews`);
        } else {
            res.status(403).send('No puedes dejar un review sin haber marcado que comiste la hamburguesa');
        }
    } catch (error) {
        res.status(500).send('Error al crear el review');
    }
};

// Mostrar los reviews de una hamburguesa
exports.listaReviews = async (req, res) => {
    const hamburguesaId = req.params.id;

    try {
        const reviews = await Review.findAll({ where: { hamburguesa_id: hamburguesaId } });
        res.render('reviews/lista', { reviews });
    } catch (error) {
        res.status(500).send('Error al obtener los reviews');
    }
};
