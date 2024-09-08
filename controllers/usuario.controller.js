const db = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = db.Usuario;

// Mostrar el formulario de registro
exports.registerForm = (req, res) => {
    res.render('usuarios/register', { errors: [], formData: {} });
};

// Procesar el registro de usuario con validaciones
exports.registerPost = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    // Validar errores del formulario
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('usuarios/register', { errors: errors.array(), formData: req.body });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Usuario.create({ nombre, apellido, email, password: hashedPassword });
        res.redirect('/usuarios/login');
    } catch (error) {
        res.status(500).send('Error en el registro');
    }
};

// Mostrar el formulario de login
exports.loginForm = (req, res) => {
    res.render('usuarios/login', { errors: [] });
};

// Procesar el login de usuario con validaciones
exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario && await bcrypt.compare(password, usuario.password)) {
            // Guardar solo el ID del usuario en la sesión
            req.session.usuarioId = usuario.id;
            req.session.nombreUsuario = usuario.nombre; // Guardar el nombre del usuario en la sesión
            console.log("Sesión creada con usuarioId:", req.session.usuarioId);
            res.redirect('/restaurantes/lista');
        } else {
            res.render('usuarios/login', { errors: [{ msg: 'Credenciales incorrectas' }] });
        }
    } catch (error) {
        res.status(500).send('Error al procesar el login');
    }
};


// Logout del usuario
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/usuarios/login');
    });
};
