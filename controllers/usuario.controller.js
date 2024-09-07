const db = require('../models');
const bcrypt = require('bcrypt');
const Usuario = db.Usuario;

// Mostrar el formulario de registro
exports.registerForm = (req, res) => {
    res.render('usuarios/register');
};

// Procesar el registro de usuario
exports.registerPost = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await Usuario.create({ nombre, apellido, email, password: hashedPassword });
        res.redirect('/usuarios/login');
    } catch (error) {
        res.status(500).send('Error en el registro');
    }
};

// Mostrar el formulario de login
exports.loginForm = (req, res) => {
    res.render('usuarios/login');
};

// Procesar el login de usuario
exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario && await bcrypt.compare(password, usuario.password)) {
            // Guardar el ID y el nombre del usuario en la sesión
            req.session.usuarioId = usuario.id;
            req.session.nombreUsuario = usuario.nombre;  // Guardar el nombre del usuario en la sesión
            res.redirect('/restaurantes/lista');
        } else {
            res.status(401).send('Credenciales incorrectas');
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
