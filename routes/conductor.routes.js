const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');
const telefonosConductorController = require('../controllers/telefono_conductor.controller');

router.get('/', conductorController.listar);
router.get('/obtener/:id', conductorController.obtener);
router.post('/guardar', conductorController.guardar);
router.post('/editar/:id', conductorController.editar);
router.get('/eliminar/:id', conductorController.eliminar);

router.get('/telefono_conductor/listar/:id', telefonosConductorController.listar);
router.post('/telefono_conductor/agregar/:id', telefonosConductorController.agregar);
router.post('/telefono_conductor/editar/:id', telefonosConductorController.editar);
router.delete('/telefono_conductor/eliminar/:id', telefonosConductorController.eliminar);


module.exports = router;