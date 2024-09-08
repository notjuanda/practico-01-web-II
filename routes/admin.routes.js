const express = require('express');
const router = express.Router();

// Importar controladores
const restauranteController = require('../controllers/restaurante.controller');
const hamburguesaController = require('../controllers/hamburguesa.controller');

// administrador pagina

router.get('/', (req, res) => {
    res.render('admin/index'); 
});


// restaurantes admin


// Mostrar lista de restaurantes (admin)
router.get('/restaurantes/lista', restauranteController.listaRestaurantesAdmin);

// Crear restaurante (admin)
router.get('/restaurantes/crear', restauranteController.crearRestauranteFormAdmin);
router.post('/restaurantes/crear', restauranteController.crearRestaurantePostAdmin);

// Editar restaurante (admin)
router.get('/restaurantes/:id/editar', restauranteController.editarRestauranteFormAdmin);
router.post('/restaurantes/:id/editar', restauranteController.editarRestaurantePostAdmin);

// Eliminar restaurante (admin)
router.post('/restaurantes/:id/borrar', restauranteController.borrarRestauranteAdmin);


// hamburguesas admin


// Mostrar todas las hamburguesas (admin)
router.get('/hamburguesas/lista', hamburguesaController.listaHamburguesasAdmin);

// Crear hamburguesa (admin)
router.get('/hamburguesas/crear', hamburguesaController.crearHamburguesaFormAdmin);
router.post('/hamburguesas/crear', hamburguesaController.crearHamburguesaPostAdmin);

// Editar hamburguesa (admin)
router.get('/hamburguesas/:id/editar', hamburguesaController.editarHamburguesaFormAdmin);
router.post('/hamburguesas/:id/editar', hamburguesaController.editarHamburguesaPostAdmin);

// Eliminar hamburguesa (admin)
router.post('/hamburguesas/:id/borrar', hamburguesaController.borrarHamburguesaAdmin);

module.exports = router;
