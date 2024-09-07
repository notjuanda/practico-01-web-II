const db = require('../models');
const Hamburguesa = db.Hamburguesa;
const Restaurante = db.Restaurante;
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

// Mostrar detalles de una hamburguesa (usuario normal)
exports.detalleHamburguesa = async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        res.render('hamburguesas/detalle', { hamburguesa });
    } catch (error) {
        res.status(500).send('Error al obtener los detalles de la hamburguesa');
    }
};


// Crear hamburguesa (admin)
exports.crearHamburguesaFormAdmin = async (req, res) => {
    try {
        // Obtener todos los restaurantes para mostrarlos en el formulario
        const restaurantes = await Restaurante.findAll();
        res.render('admin/hamburguesas/crear', { restaurantes });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de creación');
    }
};

// Procesar creación de una nueva hamburguesa (admin)
exports.crearHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio, restaurante_id } = req.body; // Obtener el restaurante_id del formulario
    try {
        // Crear hamburguesa con el restaurante_id seleccionado
        const hamburguesa = await Hamburguesa.create({ nombre, descripcion, precio, restaurante_id });

        // Guardar la imagen si se sube una
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'hamburguesas', `${hamburguesa.id}.jpg`);

            imagen.mv(imagenPath, function (err) {
                if (err) {
                    console.log("Error al subir la imagen: ", err);
                    return res.status(500).send("Error al subir la imagen.");
                }
            });
        }

        res.redirect('/admin/hamburguesas/lista');
    } catch (error) {
        res.status(500).send('Error al crear la hamburguesa');
    }
};

exports.editarHamburguesaFormAdmin = async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.findByPk(req.params.id);
        const restaurantes = await Restaurante.findAll();  // Obtener los restaurantes para el `select`
        res.render('admin/hamburguesas/editar', { hamburguesa, restaurantes });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

exports.editarHamburguesaPostAdmin = async (req, res) => {
    const { nombre, descripcion, precio, restaurante_id } = req.body;

    try {
        // Actualizar los datos de la hamburguesa incluyendo el restaurante
        await Hamburguesa.update({ nombre, descripcion, precio, restaurante_id }, { where: { id: req.params.id } });

        // Verificar si hay un archivo de imagen y guardarlo
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagenPath = path.join(__dirname, '..', 'public', 'images', 'hamburguesas', `${req.params.id}.jpg`);

            imagen.mv(imagenPath, function (err) {
                if (err) {
                    console.log("Error al subir la imagen: ", err);
                    return res.status(500).send("Error al subir la imagen.");
                }
            });
        }

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
