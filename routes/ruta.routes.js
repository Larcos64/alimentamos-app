const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/ruta.controller');

router.get('/', rutaController.listar);
router.post('/guardar', rutaController.guardar);
router.post('/editar/:id', rutaController.editar);
router.get('/eliminar/:id', rutaController.eliminar);

module.exports = router;
