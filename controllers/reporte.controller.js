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

// Reporte conductores por ruta
exports.reporteConductoresPorRuta = async (req, res) => {
    try {
        const query = `
            SELECT ruta, conductor
            FROM vista_ruta_conductores
        `;
        const { rows } = await db.query(query);
        res.render('reporte/ruta-reporte-conductores', { reporte: rows });
    } catch (error) {
        console.error('Error en reporteConductoresPorRuta:', error);
        res.status(500).send('Error al generar el reporte');
    }
};

// Reporte clientes cubiertos por ruta
exports.reporteClientesPorRuta = async (req, res) => {
    try {
        const query = `
            SELECT ruta, cliente
            FROM vista_ruta_clientes
        `;
        const { rows } = await db.query(query);
        res.render('reporte/ruta-reporte-clientes', { reporte: rows });
    } catch (error) {
        console.error('Error en reporteClientesPorRuta:', error);
        res.status(500).send('Error al generar el reporte');
    }
};