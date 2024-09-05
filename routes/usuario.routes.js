module.exports = app => {
    let router = require("express").Router();
    const usuarioController = require("../controllers/usuario.controller");

    router.get("/register", usuarioController.renderRegister);

    router.post("/register", usuarioController.register);

    router.get("/login", usuarioController.renderLogin);

    router.post("/login", usuarioController.login);

    router.get("/logout", usuarioController.logout);

    app.use('/usuarios', router);
};
