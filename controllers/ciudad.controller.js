const pool = require('../db');

// Obtener todas las ciudades
exports.obtenerCiudades = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM CIUDAD ORDER BY nombre');
    res.json(result.rows); // Ideal para peticiones AJAX
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    res.status(500).json({ error: 'Error al obtener las ciudades' });
  }
};

// Vista de lista de ciudades (para navegación tradicional)
exports.listarCiudades = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM CIUDAD ORDER BY nombre');
    res.render('ciudad/ciudad-list', { ciudades: result.rows });
  } catch (error) {
    console.error('Error al listar ciudades:', error);
    res.status(500).send('Error al listar ciudades');
  }
};

// Guardar ciudad (crear)
exports.guardarCiudad = async (req, res) => {
  const { nombre } = req.body;
  try {
    await pool.query('INSERT INTO CIUDAD (nombre) VALUES ($1)', [nombre]);
    res.redirect('/ciudad');
  } catch (error) {
    console.error('Error al guardar ciudad:', error);
    res.status(500).send('Error al guardar ciudad');
  }
};

// Editar ciudad
exports.editarCiudad = async (req, res) => {
  const { codigo } = req.params;
  const { nombre } = req.body;
  try {
    await pool.query('UPDATE CIUDAD SET nombre = $1 WHERE codigo = $2', [nombre, codigo]);
    res.redirect('/ciudad');
  } catch (error) {
    console.error('Error al editar ciudad:', error);
    res.status(500).send('Error al editar ciudad');
  }
};

// Eliminar ciudad
exports.eliminarCiudad = async (req, res) => {
  const { codigo } = req.params;
  try {
    await pool.query('DELETE FROM CIUDAD WHERE codigo = $1', [codigo]);
    res.redirect('/ciudad');
  } catch (error) {
    console.error('Error al eliminar ciudad:', error);
    res.status(500).send('Error al eliminar ciudad');
  }
};

// Para uso interno de otros controladores (sin req/res)
exports.getCiudades = async () => {
  const result = await pool.query('SELECT * FROM ciudad ORDER BY nombre');
  return result.rows;
};