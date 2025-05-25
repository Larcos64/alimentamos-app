const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudad.controller');

router.get('/', ciudadController.listarCiudades); // Vista lista
router.post('/guardar', ciudadController.guardarCiudad);
router.post('/editar/:codigo', ciudadController.editarCiudad);
router.get('/eliminar/:codigo', ciudadController.eliminarCiudad);

// Nueva ruta para obtener ciudades (AJAX u otros)
router.get('/api/todas', ciudadController.obtenerCiudades);

module.exports = router;
