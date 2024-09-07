module.exports = (req, res, next) => {
    if (req.session && req.session.usuarioId) {
        return next();
    } else {
        return res.redirect('/login');
    }
};