// routes/cliente.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cliente/cliente-list');
});

module.exports = router;
