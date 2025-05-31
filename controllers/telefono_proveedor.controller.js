const pool = require('../db');

exports.listarTelefonos = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, telefono FROM telefono_proveedor WHERE id_proveedor = $1 ORDER BY id', [id]);
        res.json({ telefonos: result.rows });
    } catch (err) {
        console.error('Error al listar teléfonos:', err);
        res.status(500).json({ error: 'Error al listar teléfonos' });
    }
};

exports.agregarTelefono = async (req, res) => {
    const { id } = req.params;
    const { telefono } = req.body;
    try {
        await pool.query('INSERT INTO telefono_proveedor (id_proveedor, telefono) VALUES ($1, $2)', [id, telefono]);
        res.redirect('/proveedor');
    } catch (err) {
        console.error('Error al agregar teléfono:', err);
        res.status(500).json({ error: 'Error al agregar teléfono' });
    }
};

exports.eliminarTelefono = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM telefono_proveedor WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error al eliminar teléfono:', err);
        res.status(500).json({ error: 'Error al eliminar teléfono' });
    }
};

exports.editarTelefono = async (req, res) => {
    const { id } = req.params;
    const { telefono } = req.body;
    try {
        await pool.query('UPDATE telefono_proveedor SET telefono = $1 WHERE id = $2', [telefono, id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error al editar teléfono:', err);
        res.status(500).json({ error: 'Error al editar teléfono' });
    }
};
