const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

// Rutas de usuarios
router.get('/register', controller.registerForm);
router.post('/register', controller.registerPost);

router.get('/login', controller.loginForm);
router.post('/login', controller.loginPost);

router.get('/logout', controller.logout);

module.exports = router;
