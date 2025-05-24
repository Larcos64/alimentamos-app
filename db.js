// db.js (PostgreSQL)
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'alimentamos',
  password: 'Larcos665',
  port: 5432
});

pool.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión', err));

module.exports = pool;
