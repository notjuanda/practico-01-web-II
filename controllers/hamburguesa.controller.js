const db = require("../models");
const Hamburguesa = db.hamburguesas;
const Lugar = db.lugares;
const Review = db.reviews; 
const path = require('path');

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
        const { nombre, descripcion, lugarId } = req.body;
        const lugar = await Lugar.findOne({ where: { id: lugarId, usuarioId: req.session.usuarioId } });
        if (!lugar) {
            return res.status(403).send("No tienes permiso para agregar hamburguesas a este restaurante.");
        }

        const hamburguesa = await Hamburguesa.create({ nombre, descripcion, lugarId });

        if (req.files?.foto) {
            const foto = req.files.foto;
            const uploadPath = path.join(__dirname, '../public/images/hamburguesa', `${hamburguesa.id}.jpg`);
            await foto.mv(uploadPath);
            hamburguesa.foto = `/images/hamburguesa/${hamburguesa.id}.jpg`;
            await hamburguesa.save();
        }

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

exports.markAsEaten = async (req, res) => {
    try {
        const { id } = req.params;
        let review = await Review.findOne({ where: { hamburguesaId: id, usuarioId: req.session.usuarioId } });
        
        if (!review) {
            review = await Review.create({
                hamburguesaId: id,
                usuarioId: req.session.usuarioId,
                comioHamburguesa: true,
                puntuacion: null,  
                comentario: null
            });
        } else {
            review.comioHamburguesa = true;
            await review.save();
        }

        res.render('reviews/askOpinion', { hamburguesaId: id, title: "¿Deseas dejar una opinión?" });
    } catch (error) {
        console.error("Error al marcar hamburguesa como comida:", error);
        res.status(500).send("Error al marcar la hamburguesa como comida.");
    }
};
