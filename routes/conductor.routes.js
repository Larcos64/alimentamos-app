const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');

router.get('/', conductorController.listar);
router.get('/obtener/:id', conductorController.obtener);
router.post('/guardar', conductorController.guardar);
router.post('/editar/:id', conductorController.editar);
router.get('/eliminar/:id', conductorController.eliminar);

module.exports = router;