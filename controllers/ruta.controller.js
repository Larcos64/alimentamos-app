const db = require('../db');

exports.listar = async (req, res) => {
    try {
        const [rutas, ciudades] = await Promise.all([
            db.query(`
                SELECT R.*, 
                       C1.nombre AS ciudad_origen, 
                       C2.nombre AS ciudad_destino,
                       HC.costo_ruta AS costo_actual,
                       TO_CHAR(R.fecha_apertura, 'YYYY-MM-DD') AS fecha_apertura_formateada
                FROM RUTA R
                JOIN CIUDAD C1 ON R.cod_ciudad_origen = C1.codigo
                JOIN CIUDAD C2 ON R.cod_ciudad_destino = C2.codigo
                LEFT JOIN LATERAL (
                    SELECT costo_ruta
                    FROM HISTORIAL_COSTO
                    WHERE id_ruta = R.id
                    ORDER BY fecha_cambio DESC, id DESC
                    LIMIT 1
                ) HC ON true
            `),
            db.query('SELECT * FROM CIUDAD')
        ]);

        res.render('ruta/ruta-list', {
            rutas: rutas.rows,
            ciudades: ciudades.rows
        });
    } catch (err) {
        console.error('Error al listar rutas:', err);
        res.status(500).send('Error al obtener rutas');
    }
};

exports.getRutas = async () => {
    const result = await db.query('SELECT * FROM RUTA');
    return result.rows;
};

exports.guardar = async (req, res) => {
    try {
        await db.query('BEGIN');

        const { nombre, cod_ciudad_origen, cod_ciudad_destino, costo_actual, fecha_apertura } = req.body;
        const fechaValida = fecha_apertura?.trim() !== '' ? fecha_apertura : null;

        const rutaResult = await db.query(
            `INSERT INTO RUTA (nombre, cod_ciudad_origen, cod_ciudad_destino, fecha_apertura)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [nombre, cod_ciudad_origen, cod_ciudad_destino, fechaValida]
        );

        const idRuta = rutaResult.rows[0].id;

        await db.query(
            `INSERT INTO HISTORIAL_COSTO (id_ruta, costo_ruta) VALUES ($1, $2)`,
            [idRuta, parseFloat(costo_actual)]
        );

        await db.query('COMMIT');
        res.redirect('/ruta');
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error al guardar ruta:', err);
        res.status(500).send('Error al guardar ruta');
    }
};

exports.editar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cod_ciudad_origen, cod_ciudad_destino, costo_actual, fecha_apertura } = req.body;

        const fechaValida = fecha_apertura && fecha_apertura.trim() !== '' ? fecha_apertura : null;
        const costo = parseFloat(costo_actual);

        await db.query(`
            UPDATE ruta
            SET nombre = $1,
                cod_ciudad_origen = $2,
                cod_ciudad_destino = $3,
                fecha_apertura = $4
            WHERE id = $5
        `, [nombre, cod_ciudad_origen, cod_ciudad_destino, fechaValida, id]);

        res.redirect('/ruta');
    } catch (err) {
        console.error('Error al editar ruta:', err);
        res.status(500).send('Error al editar ruta');
    }
};

exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM RUTA WHERE id=$1', [id]);
        res.redirect('/ruta');
    } catch (err) {
        console.error('Error al eliminar ruta:', err);
        res.status(500).send('Error al eliminar ruta');
    }
};

exports.actualizarCosto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevo_costo } = req.body;

        await db.query(
            `INSERT INTO HISTORIAL_COSTO (id_ruta, costo_ruta)
             VALUES ($1, $2)`,
            [id, parseFloat(nuevo_costo)]
        );

        res.redirect('/ruta');
    } catch (err) {
        console.error('Error al actualizar costo de ruta:', err);
        res.status(500).send('Error al actualizar costo');
    }
};
