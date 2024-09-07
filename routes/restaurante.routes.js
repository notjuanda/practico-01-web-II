const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurante.controller');
const hamburguesaController = require('../controllers/hamburguesa.controller');

// ========================
// Rutas para usuarios normales
// ========================

// Mostrar el catálogo completo de restaurantes
router.get('/lista', controller.listaRestaurantes);  // Catálogo completo (usuario normal)
router.get('/:id/detalle', controller.detalleRestaurante);  // Detalles de un restaurante (usuario normal)

module.exports = router;
