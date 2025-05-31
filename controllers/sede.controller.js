const db = require('../db');

exports.listar = async (req, res) => {
  try {
    const [sedes, ciudades] = await Promise.all([
      db.query(`
        SELECT sede.*, ciudad.nombre AS nombre_ciudad
        FROM sede
        LEFT JOIN ciudad ON ciudad.codigo = sede.cod_ciudad
      `),
      db.query(`SELECT codigo, nombre FROM ciudad`)
    ]);
    res.render('sede/sede-list', { sedes: sedes.rows, ciudades: ciudades.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al listar sedes.');
  }
};

exports.getSedes = async () => {
    const result = await db.query('SELECT * FROM SEDE');
    return result.rows;
};

exports.guardar = async (req, res) => {
  try {
    const { nombre, cod_ciudad } = req.body;
    await db.query(
      `INSERT INTO sede (nombre, cod_ciudad) VALUES ($1, $2)`,
      [nombre, cod_ciudad]
    );
    res.redirect('/sede');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar la sede.');
  }
};

exports.editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cod_ciudad } = req.body;
    await db.query(
      `UPDATE sede SET nombre = $1, cod_ciudad = $2 WHERE id = $3`,
      [nombre, cod_ciudad, id]
    );
    res.redirect('/sede');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al editar la sede.');
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM sede WHERE id = $1`, [id]);
    res.redirect('/sede');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar la sede.');
  }
};
