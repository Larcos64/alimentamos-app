const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.get('/ventas-cliente', reporteController.listarResumenVentasPorCliente);
router.get('/ventas-ciudad', reporteController.reporteVentasPorCiudad);

module.exports = router;
