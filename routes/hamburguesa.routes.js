const express = require('express');
const router = express.Router();
const controller = require('../controllers/hamburguesa.controller');

// ========================
// Rutas para usuarios normales
// ========================

// Mostrar hamburguesas de un restaurante específico (usuario normal)
router.get('/restaurantes/:id/hamburguesas', controller.listaHamburguesasPorRestaurante);  // Lista de hamburguesas por restaurante
router.get('/hamburguesas/:id/detalle', controller.detalleHamburguesa);  // Detalles de una hamburguesa

module.exports = router;
