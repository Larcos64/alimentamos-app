const db = require('../db');

// Resumen ventas por cliente
exports.listarResumenVentasPorCliente = async (req, res) => {
    try {
        const resultado = await db.query(`SELECT * FROM vista_ventas_cliente`);
        res.render('reporte/venta-reporte-cliente', {
            reporte: resultado.rows
        });
    } catch (error) {
        console.error("Error al obtener reporte de ventas por cliente:", error);
        res.status(500).send("Error al obtener reporte de ventas por cliente");
    }
};


// Reporte ventas por ciudad
exports.reporteVentasPorCiudad = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM vista_ventas_ciudad');
        res.render('reporte/venta-reporte-ciudad', { reporte: resultado.rows });
    } catch (error) {
        console.error('Error al generar reporte de ventas por ciudad:', error);
        res.status(500).send('Error al generar el reporte');
    }
};

