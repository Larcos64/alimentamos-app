const db = require('../db');

// Listar teléfonos de un conductor
exports.listar = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT id, telefono FROM telefono_conductor WHERE id_conductor = $1', [id]);
        res.json({ telefonos: result.rows });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar teléfonos' });
    }
};

// Agregar teléfono
exports.agregar = async (req, res) => {
    const { telefono } = req.body;
    const { id } = req.params;

    try {
        await db.query('INSERT INTO telefono_conductor (id_conductor, telefono) VALUES ($1, $2)', [id, telefono]);
        res.redirect('/conductor');
    } catch (error) {
        res.status(500).send('Error al agregar teléfono');
    }
};

// editar
exports.editar = async (req, res) => {
    const id = req.params.id;
    const { telefono } = req.body;

    try {
        await db.query('UPDATE telefono_conductor SET telefono = $1 WHERE id = $2', [telefono, id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error al editar teléfono' });
    }
};

// eliminar
exports.eliminar = async (req, res) => {
    const id = req.params.id;

    try {
        await db.query('DELETE FROM telefono_conductor WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error al eliminar teléfono' });
    }
};

