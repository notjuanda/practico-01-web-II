const express = require('express');
const router = express.Router();

// Importar rutas corregidas
const usuarioRoutes = require('./usuario.routes');
const restauranteRoutes = require('./restaurante.routes');
const hamburguesaRoutes = require('./hamburguesa.routes');
const reviewRoutes = require('./review.routes');
const hamburguesasComidasRoutes = require('./hamburguesasComidas.routes');

// Importar rutas de administración
const adminRoutes = require('./admin.routes');

// Definir las rutas para usuarios normales
router.use('/usuarios', usuarioRoutes);  
router.use('/restaurantes', restauranteRoutes);  
router.use('/hamburguesas', hamburguesaRoutes); 
router.use('/reviews', reviewRoutes); 
router.use('/hamburguesas-comidas', hamburguesasComidasRoutes); 

// ========================
// Rutas de administración (Prefijo: /admin)
// ========================
router.use('/admin', adminRoutes);  // Todas las rutas de admin bajo el prefijo /admin

module.exports = router;
