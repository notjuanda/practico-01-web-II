const db = require('../models');
const HamburguesaComida = db.HamburguesaComida;
const Hamburguesa = db.Hamburguesa;

// Marcar que el usuario ha comido una hamburguesa
exports.marcarHamburguesaComida = async (req, res) => {
    const hamburguesaId = req.params.id;

    try {
        const existe = await HamburguesaComida.findOne({
            where: { usuario_id: req.session.usuarioId, hamburguesa_id: hamburguesaId }
        });

        if (!existe) {
            await HamburguesaComida.create({
                usuario_id: req.session.usuarioId,
                hamburguesa_id: hamburguesaId
            });
            res.redirect(`/hamburguesas/${hamburguesaId}/detalle`);
        } else {
            res.status(400).send('Ya has marcado esta hamburguesa como comida');
        }
    } catch (error) {
        res.status(500).send('Error al marcar la hamburguesa como comida');
    }
};

// Mostrar las hamburguesas comidas por el usuario
exports.listaHamburguesasComidas = async (req, res) => {
    try {
        const hamburguesasComidas = await HamburguesaComida.findAll({
            where: { usuario_id: req.session.usuarioId },
            include: [Hamburguesa]
        });

        res.render('hamburguesasComidas/lista', { hamburguesasComidas });
    } catch (error) {
        res.status(500).send('Error al obtener las hamburguesas comidas');
    }
};
