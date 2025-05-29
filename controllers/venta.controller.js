const db = require('../db');
const clienteController = require('./cliente.controller');
const rutaController = require('./ruta.controller');

exports.listarVentas = async (req, res) => {
    try {
        const ventas = await db.query(`
            SELECT v.*, c.nombre AS nombre_cliente, r.nombre AS nombre_ruta 
            FROM venta v
            LEFT JOIN cliente c ON v.id_cliente = c.id
            LEFT JOIN ruta r ON v.id_ruta = r.id
        `);

        const clientes = await clienteController.getClientes();
        const rutas = await rutaController.getRutas();

        res.render('venta/venta-list', {
            ventas: ventas.rows,
            clientes,
            rutas
        });
    } catch (error) {
        console.log("error: ", error);
        
        res.status(500).send('Error al listar ventas');
    }
};

exports.guardarVenta = async (req, res) => {
    const { valor_venta, fecha_entrega, id_cliente, id_ruta } = req.body;
    try {
        await db.query(
            'INSERT INTO venta (valor_venta, fecha_entrega, id_cliente, id_ruta) VALUES ($1, $2, $3, $4)',
            [valor_venta, fecha_entrega, id_cliente, id_ruta]
        );
        res.redirect('/venta');
    } catch (error) {
        console.log("error: ", error);
        
        res.status(500).send('Error al guardar la venta');
    }
};

exports.editarVenta = async (req, res) => {
    const { valor_venta, fecha_entrega, id_cliente, id_ruta } = req.body;
    const { id } = req.params;
    try {
        await db.query(
            'UPDATE venta SET valor_venta = $1, fecha_entrega = $2, id_cliente = $3, id_ruta = $4 WHERE id = $5',
            [valor_venta, fecha_entrega, id_cliente, id_ruta, id]
        );
        res.redirect('/venta');
    } catch (error) {
        res.status(500).send('Error al editar la venta');
    }
};

exports.eliminarVenta = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM venta WHERE id = $1', [id]);
        res.redirect('/venta');
    } catch (error) {
        res.status(500).send('Error al eliminar la venta');
    }
};

// Métodos auxiliares
exports.getVentas = async () => {
    const result = await db.query('SELECT * FROM venta');
    return result.rows;
};

// Obtener rutas donde ciudad_destino coincida con la del cliente
exports.obtenerRutasPorCliente = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const cliente = await db.query('SELECT cod_ciudad FROM cliente WHERE id = $1', [idCliente]);
        if (cliente.rows.length === 0) return res.status(404).json([]);

        const ciudadDestino = cliente.rows[0].cod_ciudad;
        const rutas = await db.query('SELECT id, nombre FROM ruta WHERE cod_ciudad_destino = $1', [ciudadDestino]);

        res.json(rutas.rows);
    } catch (error) {
        console.error('Error al obtener rutas por cliente:', error);
        res.status(500).json([]);
    }
};
