const db = require("../models");
const Lugar = db.lugares;
const Hamburguesa = db.hamburguesas;
const path = require('path');

exports.renderCreateLugar = (req, res) => {
    res.render('lugares/create', { title: "Crear Lugar" });
};

exports.createLugar = async (req, res) => {
    try {
        const { nombre, direccion, usuarioId } = req.body;
        const lugar = await Lugar.create({ nombre, direccion, usuarioId });

        if (req.files?.foto) {
            const foto = req.files.foto;
            const uploadPath = path.join(__dirname, '../public/images/restaurant', `${lugar.id}.jpg`);
            await foto.mv(uploadPath);
            lugar.foto = `/images/restaurant/${lugar.id}.jpg`;
            await lugar.save();
        }

        res.redirect('/lugares');
    } catch (error) {
        console.error("Error al crear lugar:", error);
        res.status(500).send("Error al crear lugar.");
    }
};

exports.listLugares = async (req, res) => {
    try {
        const lugares = await Lugar.findAll({ include: ["usuario"] });
        res.render('lugares/list', { title: "Lista de Lugares", lugares });
    } catch (error) {
        console.error("Error al listar lugares:", error);
        res.status(500).send("Error al listar lugares.");
    }
};

exports.listHamburguesasByLugar = async (req, res) => {
    try {
        const lugarId = req.params.id;
        const lugar = await Lugar.findByPk(lugarId);

        if (!lugar) {
            return res.status(404).send("Restaurante no encontrado.");
        }

        const hamburguesas = await Hamburguesa.findAll({
            where: { lugarId },
            include: ["lugar"]
        });

        res.render('hamburguesas/list', { title: `Hamburguesas en ${lugar.nombre}`, hamburguesas });
    } catch (error) {
        console.error("Error al listar hamburguesas:", error);
        res.status(500).send("Error al listar hamburguesas.");
    }
};
