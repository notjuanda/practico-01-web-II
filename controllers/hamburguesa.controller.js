const db = require('../models');
const Hamburguesa = db.Hamburguesa;
const Restaurante = db.Restaurante;
const HamburguesaComida = db.HamburguesaComida;
const Review = db.Review;

const path = require('path');

// Mostrar todas las hamburguesas (admin)
exports.listaHamburguesasAdmin = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll();
        res.render('admin/hamburguesas/lista', { hamburguesas });
    } catch (error) {
        res.status(500).send('Error al obtener las hamburguesas');
    }
};

// Mostrar hamburguesas de un restaurante específico (usuario normal)
exports.listaHamburguesasPorRestaurante = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll({ where: { restaurante_id: req.params.id } });
        res.render('hamburguesas/lista', { hamburguesas });
    } catch (error) {
        res.status(500).send('Error al obtener las hamburguesas del restaurante');
    }
};

exports.detalleHamburguesa = async (req, res) => {
    try {
        console.log("Detalle de la hamburguesa");

        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        if (!hamburguesa) {
            console.log("Hamburguesa no encontrada");
            return res.status(404).send('Hamburguesa no encontrada');
        }

        console.log("ID recibido:", req.params.id);
        let comida = false;
        let yaDejoReview = false;

        if (req.session.usuarioId) {
            console.log("Usuario logueado con ID:", req.session.usuarioId);

            // Verificar si el usuario marcó la hamburguesa como comida
            const hamburguesaComida = await HamburguesaComida.findOne({
                where: {
                    usuario_id: req.session.usuarioId,
                    hamburguesa_id: req.params.id
                }
            });

            comida = !!hamburguesaComida;
            console.log("¿Comida marcada?", comida);

            // Verificar si el usuario dejó un review para la hamburguesa
            const reviewExistente = await Review.findOne({
                where: { usuario_id: req.session.usuarioId, hamburguesa_id: req.params.id }
            });

            yaDejoReview = !!reviewExistente;
            console.log("¿Dejó review?", yaDejoReview);
        } else {
            console.log("Usuario no logueado");
        }

        const reviews = await Review.findAll({
            where: { hamburguesa_id: req.params.id },
            include: [{ model: db.Usuario, attributes: ['nombre'] }]
        });

        console.log("Reviews encontrados:", reviews.length);

        res.render('hamburguesas/detalle', { hamburguesa, comida, reviews, yaDejoReview });
    } catch (error) {
        console.error("Error en detalle de hamburguesa:", error);
        res.status(500).send('Error al obtener los detalles de la hamburguesa.');
    }
};

// Crear hamburguesa (admin)
exports.crearHamburguesaFormAdmin = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.render('admin/hamburguesas/crear', { restaurantes });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de creación');
    }
};

// Crear hamburguesa (admin)
exports.crearHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio, restaurante_id } = req.body;
    try {
        // Crear la hamburguesa
        const hamburguesa = await Hamburguesa.create({ nombre, descripcion, precio, restaurante_id });

        // Verificar si hay un archivo de imagen
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'hamburguesas', `${hamburguesa.id}.jpg`);

            // Mover la imagen al directorio correspondiente
            await imagen.mv(imagenPath); // Usar await para manejar errores mejor

            // Actualizar el campo 'imagen' en la base de datos con la ruta relativa
            await hamburguesa.update({ imagen: `/images/hamburguesas/${hamburguesa.id}.jpg` });
        }

        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
        console.error("Error al crear la hamburguesa:", error);
        res.status(500).send('Error al crear la hamburguesa');
    }
};

exports.editarHamburguesaFormAdmin = async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        const restaurantes = await Restaurante.findAll();  
        res.render('admin/hamburguesas/editar', { hamburguesa, restaurantes });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

// Editar hamburguesa (admin)
exports.editarHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio, restaurante_id } = req.body;

    try {
        // Actualizar los datos de la hamburguesa
        await Hamburguesa.update({ nombre, descripcion, precio, restaurante_id }, { where: { id: req.params.id } });

        // Verificar si hay un archivo de imagen y guardarlo
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'hamburguesas', `${req.params.id}.jpg`);

            // Mover la imagen al directorio correspondiente
            await imagen.mv(imagenPath); // Usar await para manejar errores mejor

            // Actualizar el campo 'imagen' en la base de datos
            await Hamburguesa.update({ imagen: `/images/hamburguesas/${req.params.id}.jpg` }, { where: { id: req.params.id } });
        }

        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
        console.error("Error al actualizar la hamburguesa:", error);
        res.status(500).send('Error al actualizar la hamburguesa');
    }
};

// Procesar la eliminación de una hamburguesa (admin)
exports.borrarHamburguesaAdmin = async (req, res) => {
    try {
        await Hamburguesa.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
        res.status(500).send('Error al eliminar la hamburguesa');
    }
};
