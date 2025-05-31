const db = require('../db');

// Listar conductores
exports.listar = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM conductor');
        res.render('conductor/conductor-list', { conductores: result.rows });
    } catch (error) {
        console.error('Error al listar conductores:', error);
        res.status(500).send('Error al listar conductores');
    }
};

exports.getConductores = async () => {
    const result = await db.query('SELECT * FROM CONDUCTOR');
    return result.rows;
};

// Obtener un conductor por ID
exports.obtener = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM conductor WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Conductor no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener conductor:', error);
        res.status(500).send('Error al obtener conductor');
    }
};

// Guardar nuevo conductor
exports.guardar = async (req, res) => {
    const { id, nombres, apellidos, direccion, fecha_ingreso, fecha_asignacion } = req.body;
    try {
        await db.query(
            'INSERT INTO conductor (id, nombres, apellidos, direccion, fecha_ingreso, fecha_asignacion) VALUES ($1, $2, $3, $4, $5, $6)',
            [id, nombres, apellidos, direccion, fecha_ingreso || null, fecha_asignacion || null]
        );
        res.redirect('/conductor');
    } catch (error) {
        console.error('Error al guardar conductor:', error);
        res.status(500).send('Error al guardar conductor');
    }
};

// Editar conductor existente
exports.editar = async (req, res) => {
    const { nombres, apellidos, direccion, fecha_ingreso, fecha_asignacion } = req.body;
    try {
        await db.query(
        'UPDATE conductor SET nombres = $1, apellidos = $2, direccion = $3, fecha_ingreso = $4, fecha_asignacion = $5 WHERE id = $6',
        [nombres, apellidos, direccion, fecha_ingreso || null, fecha_asignacion || null, req.params.id]
        );
        res.redirect('/conductor');
    } catch (error) {
        console.error('Error al editar conductor:', error);
        res.status(500).send('Error al editar conductor');
    }
};

// Eliminar conductor
exports.eliminar = async (req, res) => {
    try {
        await db.query('DELETE FROM conductor WHERE id = $1', [req.params.id]);
        res.redirect('/conductor');
    } catch (error) {
        console.error('Error al eliminar conductor:', error);
        res.status(500).send('Error al eliminar conductor');
    }
};
