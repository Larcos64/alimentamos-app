const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.get('/ventas-cliente', reporteController.listarResumenVentasPorCliente);

module.exports = router;
