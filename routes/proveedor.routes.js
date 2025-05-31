const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');
const telefonosProveedorController = require('../controllers/telefonos_proveedor.controller');
console.log('telefonosProveedorController:', telefonosProveedorController);

// Rutas proveedor
router.get('/', proveedorController.listar);
router.post('/guardar', proveedorController.guardar);
router.post('/editar/:id', proveedorController.editar);
router.get('/eliminar/:id', proveedorController.eliminar);

// Rutas teléfonos proveedor
router.get('/telefonos_proveedor/listar/:id', telefonosProveedorController.listarTelefonos);
router.post('/telefonos_proveedor/agregar/:id', telefonosProveedorController.agregarTelefono);
router.post('/telefonos_proveedor/editar/:id', telefonosProveedorController.editarTelefono);
router.delete('/telefonos_proveedor/eliminar/:id', telefonosProveedorController.eliminarTelefono);

module.exports = router;
