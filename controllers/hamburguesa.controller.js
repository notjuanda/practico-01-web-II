const db = require("../models");
const Hamburguesa = db.hamburguesas;
const Lugar = db.lugares;

exports.renderCreateHamburguesa = async (req, res) => {
    try {
        const lugares = await Lugar.findAll({ where: { usuarioId: req.session.usuarioId } });
        if (lugares.length === 0) {
            return res.status(403).send("Debes ser dueño de al menos un restaurante para crear una hamburguesa.");
        }
        res.render('hamburguesas/create', { title: "Crear Hamburguesa", lugares });
    } catch (error) {
        console.error("Error al renderizar la página de creación de hamburguesas:", error);
        res.status(500).send("Error al cargar la página de creación.");
    }
};

exports.createHamburguesa = async (req, res) => {
    try {
        const { nombre, descripcion, foto, lugarId } = req.body;
        const lugar = await Lugar.findOne({ where: { id: lugarId, usuarioId: req.session.usuarioId } });
        if (!lugar) {
            return res.status(403).send("No tienes permiso para agregar hamburguesas a este restaurante.");
        }
        await Hamburguesa.create({ nombre, descripcion, foto, lugarId });
        res.redirect('/hamburguesas');
    } catch (error) {
        console.error("Error al crear hamburguesa:", error);
        res.status(500).send("Error al crear hamburguesa.");
    }
};

exports.listHamburguesas = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll({ include: ["lugar"] });
        res.render('hamburguesas/list', { title: "Lista de Hamburguesas", hamburguesas });
    } catch (error) {
        console.error("Error al listar hamburguesas:", error);
        res.status(500).send("Error al listar hamburguesas.");
    }
};
