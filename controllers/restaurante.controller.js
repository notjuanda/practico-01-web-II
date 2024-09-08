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

// Crear restaurante (admin)
exports.crearRestaurantePostAdmin = async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;

    try {
        // Crear el restaurante
        const restaurante = await Restaurante.create({ nombre, ubicacion, descripcion });

        // Verificar si hay un archivo de imagen
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'restaurantes', `${restaurante.id}.jpg`);

            // Mover la imagen al directorio correspondiente
            imagen.mv(imagenPath, function (err) {
                if (err) {
                    console.log("Error al subir la imagen: ", err);
                    return res.status(500).send("Error al subir la imagen.");
                }
            });

            // Actualizar el campo 'imagen' en la base de datos
            await restaurante.update({ imagen: `/images/restaurantes/${restaurante.id}.jpg` });
        }

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

// Editar restaurante (admin)
exports.editarRestaurantePostAdmin = async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;

    try {
        // Actualizar los datos del restaurante
        await Restaurante.update({ nombre, ubicacion, descripcion }, { where: { id: req.params.id } });

        // Verificar si hay un archivo de imagen y guardarlo
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'restaurantes', `${req.params.id}.jpg`);

            // Mover la imagen al directorio correspondiente
            imagen.mv(imagenPath, function (err) {
                if (err) {
                    console.log("Error al subir la imagen: ", err);
                    return res.status(500).send("Error al subir la imagen.");
                }
            });

            // Actualizar el campo 'imagen' en la base de datos
            await Restaurante.update({ imagen: `/images/restaurantes/${req.params.id}.jpg` }, { where: { id: req.params.id } });
        }

        res.redirect('/admin/restaurantes/lista');
    } catch (error) {
        res.status(500).send('Error al actualizar el restaurante');
    }
};

// eliminar el restaurante
exports.borrarRestauranteAdmin = async (req, res) => {
    try {
        await Restaurante.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/restaurantes/lista');
    } catch (error) {
        res.status(500).send('Error al eliminar el restaurante');
    }
};
