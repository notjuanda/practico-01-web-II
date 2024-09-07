const db = require('../models');
const Restaurante = db.Restaurante;
const path = require('path');

// Mostrar el catálogo completo de restaurantes (para usuario normal)
exports.listaRestaurantes = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.render('restaurantes/lista', { restaurantes });
    } catch (error) {
        res.status(500).send('Error al obtener los restaurantes');
    }
};

// Mostrar el catálogo completo de restaurantes (para admin)
exports.listaRestaurantesAdmin = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.render('admin/restaurantes/lista', { restaurantes });
    } catch (error) {
        res.status(500).send('Error al obtener los restaurantes');
    }
};

// Mostrar detalles de un restaurante (usuario normal)
exports.detalleRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByPk(req.params.id);
        res.render('restaurantes/detalle', { restaurante });
    } catch (error) {
        res.status(500).send('Error al obtener los detalles del restaurante');
    }
};

// Mostrar formulario para crear un restaurante (admin)
exports.crearRestauranteFormAdmin = (req, res) => {
    res.render('admin/restaurantes/crear');
};

// Procesar creación de un nuevo restaurante (admin)
exports.crearRestaurantePostAdmin = async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;
    try {
        await Restaurante.create({ nombre, ubicacion, descripcion });
        res.redirect('/admin/restaurantes/lista');
    } catch (error) {
        res.status(500).send('Error al crear el restaurante');
    }
};

// Mostrar formulario para editar un restaurante (admin)
exports.editarRestauranteFormAdmin = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByPk(req.params.id);
        res.render('admin/restaurantes/editar', { restaurante });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

// Procesar la edición de un restaurante (admin)
exports.editarRestaurantePostAdmin = async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;
    try {
        await Restaurante.update({ nombre, ubicacion, descripcion }, { where: { id: req.params.id } });
        res.redirect('/admin/restaurantes/lista');
    } catch (error) {
        res.status(500).send('Error al actualizar el restaurante');
    }
};

// Procesar la eliminación de un restaurante (admin)
exports.borrarRestauranteAdmin = async (req, res) => {
    try {
        await Restaurante.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/restaurantes/lista');
    } catch (error) {
        res.status(500).send('Error al eliminar el restaurante');
    }
};

// Subida de imagen para un restaurante (admin)
exports.uploadImagenFormAdmin = async function (req, res) {
    const id = req.params.id;
    const restaurante = await Restaurante.findByPk(id);
    res.render('admin/restaurantes/uploadImagen', { restaurante: restaurante, errors: null });
};

exports.uploadImagenPostAdmin = async function (req, res) {
    const id = req.params.id;
    const restaurante = await Restaurante.findByPk(id);

    if (!req.files?.imagen) {  // Verificar si hay un archivo de imagen
        res.render('admin/restaurantes/uploadImagen', { errors: { message: 'Debe seleccionar una imagen' }, restaurante });
        return;
    }

    const imagen = req.files.imagen;
    const imagenPath = path.join(__dirname + '/../public/images/restaurantes/' + restaurante.id + '.jpg');

    imagen.mv(imagenPath, function (err) {
        if (err) {
            res.render('admin/restaurantes/uploadImagen', { errors: { message: 'Error al subir la imagen' }, restaurante });
            console.log(err);
            return;
        }
        res.redirect('/admin/restaurantes/lista');  // Redirigir a la lista de restaurantes después de la subida
    });
};