const express = require('express');
const router = express.Router();
const sedeController = require('../controllers/sede.controller');

router.get('/', sedeController.listar);
router.post('/guardar', sedeController.guardar);
router.post('/editar/:id', sedeController.editar);
router.get('/eliminar/:id', sedeController.eliminar);

module.exports = router;
