module.exports = (req, res, next) => {
    console.log("Verificando sesión:", req.session);

    // Verificar si el usuario está autenticado por su ID
    if (req.session && req.session.usuarioId) {
        console.log("Usuario autenticado con ID:", req.session.usuarioId);
        return next();
    } else {
        console.log("Usuario no autenticado, redirigiendo a login");
        return res.redirect('/usuarios/login');
    }
};
