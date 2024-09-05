const db = require("../models");
const Lugar = db.lugares;

exports.renderCreateLugar = (req, res) => {
    res.render('lugares/create', { title: "Crear Lugar" });
};

exports.createLugar = async (req, res) => {
    try {
        const { nombre, direccion, foto, usuarioId } = req.body;

        await Lugar.create({
            nombre,
            direccion,
            foto,
            usuarioId
        });

        res.redirect('/lugares');
    } catch (error) {
        console.error("Error al crear lugar:", error);
        res.status(500).send("Error al crear lugar.");
    }
};

exports.listLugares = async (req, res) => {
    try {
        const lugares = await Lugar.findAll({
            include: ["usuario"]
        });

        res.render('lugares/list', { title: "Lista de Lugares", lugares });
    } catch (error) {
        console.error("Error al listar lugares:", error);
        res.status(500).send("Error al listar lugares.");
    }
};
