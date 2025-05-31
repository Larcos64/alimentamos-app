const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');
const telefonosProveedorController = require('../controllers/telefono_proveedor.controller');

// Rutas proveedor
router.get('/', proveedorController.listar);
router.post('/guardar', proveedorController.guardar);
router.post('/editar/:id', proveedorController.editar);
router.get('/eliminar/:id', proveedorController.eliminar);

// Rutas teléfonos proveedor
router.get('/telefono_proveedor/listar/:id', telefonosProveedorController.listarTelefonos);
router.post('/telefono_proveedor/agregar/:id', telefonosProveedorController.agregarTelefono);
router.post('/telefono_proveedor/editar/:id', telefonosProveedorController.editarTelefono);
router.delete('/telefono_proveedor/eliminar/:id', telefonosProveedorController.eliminarTelefono);

module.exports = router;
