const express = require('express');
const router = express.Router();
const controller = require('../controllers/hamburguesasComidas.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Marcar una hamburguesa como comida
router.post('/:id/marcar', authMiddleware, controller.marcarHamburguesaComida);

// Mostrar las hamburguesas comidas por el usuario
router.get('/mias', authMiddleware, controller.listaHamburguesasComidas);

module.exports = router;
