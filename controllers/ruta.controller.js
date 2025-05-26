const pool = require('../db');

exports.listar = async (req, res) => {
    try {
        const [rutas, ciudades] = await Promise.all([
            pool.query(`
        SELECT R.*, 
               C1.nombre AS ciudad_origen, 
               C2.nombre AS ciudad_destino
        FROM RUTA R
        JOIN CIUDAD C1 ON R.cod_ciudad_origen = C1.codigo
        JOIN CIUDAD C2 ON R.cod_ciudad_destino = C2.codigo
      `),
            pool.query('SELECT * FROM CIUDAD')
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

exports.guardar = async (req, res) => {
    try {
        const { nombre, cod_ciudad_origen, cod_ciudad_destino, costo_actual, fecha_apertura } = req.body;

        const fechaValida = fecha_apertura && fecha_apertura.trim() !== '' ? fecha_apertura : null;
        const costo = parseFloat(costo_actual);

        await pool.query(
            `INSERT INTO RUTA (nombre, cod_ciudad_origen, cod_ciudad_destino, costo_actual, fecha_apertura)
             VALUES ($1, $2, $3, $4, $5)`,
            [nombre, cod_ciudad_origen, cod_ciudad_destino, costo, fechaValida]
        );

        res.redirect('/ruta');
    } catch (err) {
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

        await pool.query(`
            UPDATE ruta
            SET nombre = $1,
                cod_ciudad_origen = $2,
                cod_ciudad_destino = $3,
                costo_actual = $4,
                fecha_apertura = $5
            WHERE id = $6
        `, [nombre, cod_ciudad_origen, cod_ciudad_destino, costo, fechaValida, id]);

        res.redirect('/ruta');
    } catch (err) {
        console.error('Error al editar ruta:', err);
        res.status(500).send('Error al editar ruta');
    }
};

exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM RUTA WHERE id=$1', [id]);
        res.redirect('/ruta');
    } catch (err) {
        console.error('Error al eliminar ruta:', err);
        res.status(500).send('Error al eliminar ruta');
    }
};
