const express = require('express');
const router = express.Router();
const controller = require('../controllers/hamburguesa.controller');

// ========================
// Rutas para usuarios normales
// ========================

// Mostrar hamburguesas de un restaurante específico (usuario normal)
router.get('/:id/detalle', controller.detalleHamburguesa);
router.get('/:id/hamburguesas', controller.listaHamburguesasPorRestaurante);  // Esta es la nueva ruta que añadimos.

module.exports = router;
