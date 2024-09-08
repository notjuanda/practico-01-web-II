const db = require('../models');
const HamburguesaComida = db.HamburguesaComida;
const Hamburguesa = db.Hamburguesa;

// Marcar que se comió una hamburguesa
exports.marcarHamburguesaComida = async (req, res) => {
    const hamburguesaId = req.params.id;

    try {
        console.log("Intentando marcar hamburguesa como comida. Usuario ID:", req.session.usuarioId);
        
        const existe = await HamburguesaComida.findOne({
            where: { usuario_id: req.session.usuarioId, hamburguesa_id: hamburguesaId }
        });

        if (!existe) {
            await HamburguesaComida.create({
                usuario_id: req.session.usuarioId,
                hamburguesa_id: hamburguesaId
            });
            console.log("Hamburguesa marcada como comida:", hamburguesaId);
            res.redirect(`/hamburguesas/${hamburguesaId}/detalle`);
        } else {
            console.log("La hamburguesa ya estaba marcada como comida:", hamburguesaId);
            res.status(400).send('Ya has marcado esta hamburguesa como comida');
        }
    } catch (error) {
        console.error("Error al marcar la hamburguesa como comida:", error);
        res.status(500).send('Error al marcar la hamburguesa como comida');
    }
};


// Mostrar las hamburguesas comidas
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
