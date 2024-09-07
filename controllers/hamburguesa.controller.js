const db = require('../models');
const Hamburguesa = db.Hamburguesa;
const path = require('path');

// Mostrar hamburguesas de un restaurante específico (usuario normal)
exports.listaHamburguesasPorRestaurante = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll({ where: { restaurante_id: req.params.id } });
        res.render('hamburguesas/lista', { hamburguesas });
    } catch (error) {
        res.status(500).send('Error al obtener las hamburguesas del restaurante');
    }
};

// Mostrar detalles de una hamburguesa (usuario normal)
exports.detalleHamburguesa = async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        res.render('hamburguesas/detalle', { hamburguesa });
    } catch (error) {
        res.status(500).send('Error al obtener los detalles de la hamburguesa');
    }
};

// Mostrar todas las hamburguesas (admin)
exports.listaHamburguesasAdmin = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll();
        res.render('admin/hamburguesas/lista', { hamburguesas });
    } catch (error) {
        res.status(500).send('Error al obtener las hamburguesas');
    }
};

// Crear hamburguesa (admin)
exports.crearHamburguesaFormAdmin = (req, res) => {
    res.render('admin/hamburguesas/crear', { restauranteId: req.params.id });
};

// Procesar creación de una nueva hamburguesa (admin)
exports.crearHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
        await Hamburguesa.create({ nombre, descripcion, precio, restaurante_id: req.params.id });
        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
        res.status(500).send('Error al crear la hamburguesa');
    }
};

// Mostrar formulario para editar una hamburguesa (admin)
exports.editarHamburguesaFormAdmin = async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        res.render('admin/hamburguesas/editar', { hamburguesa });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

// Procesar la edición de una hamburguesa (admin)
exports.editarHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
        await Hamburguesa.update({ nombre, descripcion, precio }, { where: { id: req.params.id } });
        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
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

// Subida de imagen para una hamburguesa (admin)
exports.uploadImagenFormAdmin = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await Hamburguesa.findByPk(id);
    res.render('admin/hamburguesas/uploadImagen', { hamburguesa: hamburguesa, errors: null });
};

exports.uploadImagenPostAdmin = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await Hamburguesa.findByPk(id);

    if (!req.files?.imagen) {  // Verificar si hay un archivo de imagen
        res.render('admin/hamburguesas/uploadImagen', { errors: { message: 'Debe seleccionar una imagen' }, hamburguesa });
        return;
    }

    const imagen = req.files.imagen;
    const imagenPath = path.join(__dirname, '..', 'public', 'images', 'hamburguesas', `${hamburguesa.id}.jpg`);

    imagen.mv(imagenPath, function (err) {
        if (err) {
            res.render('admin/hamburguesas/uploadImagen', { errors: { message: 'Error al subir la imagen' }, hamburguesa });
            console.log(err);
            return;
        }
        res.redirect('/admin/hamburguesas/lista');  // Redirigir a la lista de hamburguesas después de la subida
    });
};