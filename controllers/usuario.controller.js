const db = require("../models");
const bcrypt = require("bcrypt");
const Usuario = db.usuarios;

exports.renderRegister = (req, res) => {
    res.render('usuarios/register', { title: "Registro" });
};

exports.register = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await Usuario.create({
            nombre,
            apellido,
            email,
            password: hashedPassword
        });

        res.redirect('/usuarios/login');
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error al registrar usuario.");
    }
};

exports.renderLogin = (req, res) => {
    res.render('usuarios/login', { title: "Login" });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).send("Usuario no encontrado.");
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(400).send("Contraseña incorrecta.");
        }
        
        req.session.usuarioId = usuario.id;
        req.session.usuarioNombre = usuario.nombre;

        res.redirect('/');
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el login.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(); 
    res.redirect('/usuarios/login'); 
};