const express = require('express');
const router = express.Router();
const controller = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un review si el usuario ha marcado que comió la hamburguesa
router.post('/:id/create', authMiddleware, controller.crearReviewPost);

// Mostrar los reviews de una hamburguesa
router.get('/:id/lista', controller.listaReviews);

module.exports = router;
