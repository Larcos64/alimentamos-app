const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller');

router.get('/', ventaController.listarVentas);
router.post('/guardar', ventaController.guardarVenta);
router.post('/editar/:id', ventaController.editarVenta);
router.get('/eliminar/:id', ventaController.eliminarVenta);
// Obtener rutas según cliente
router.get('/rutas-por-cliente/:idCliente', ventaController.obtenerRutasPorCliente);

module.exports = router;
