const express = require('express');
const router = express.Router();
const pool = require('../db'); // Asegúrate de que la conexión a PostgreSQL está bien

// Mostrar formulario
router.get('/nueva', (req, res) => {
  res.render('ciudad/ciudad-form');
});

// Guardar nueva ciudad
router.post('/guardar', async (req, res) => {
  const { nombre } = req.body;
  try {
    await pool.query('INSERT INTO ciudad (nombre) VALUES ($1)', [nombre]);
    res.redirect('/ciudad');
  } catch (err) {
    console.error('Error al guardar ciudad:', err);
    res.status(500).send('Error al guardar ciudad');
  }
});

// Mostrar lista de ciudades
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM ciudad ORDER BY codigo');
    res.render('ciudad/ciudad-list', { ciudades: resultado.rows });
  } catch (err) {
    console.error('Error al obtener ciudades:', err);
    res.status(500).send('Error al obtener ciudades');
  }
});

// Eliminar ciudad
router.get('/eliminar/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    await pool.query('DELETE FROM ciudad WHERE codigo = $1', [codigo]);
    res.redirect('/ciudad');
  } catch (err) {
    console.error('Error al eliminar ciudad:', err);
    res.status(500).send('Error al eliminar ciudad');
  }
});

module.exports = router;
