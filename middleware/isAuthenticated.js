function isAuthenticated(req, res, next) {
    if (req.session.usuarioId) {
        return next(); 
    } else {
        res.redirect('/usuarios/login'); 
    }
}

module.exports = isAuthenticated;