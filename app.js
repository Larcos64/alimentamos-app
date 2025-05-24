const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
const ciudadRoutes = require('./routes/ciudad.routes');
app.use('/ciudad', ciudadRoutes);

const clienteRoutes = require('./routes/cliente.routes');
app.use('/cliente', clienteRoutes);

const conductorRoutes = require('./routes/conductor.routes');
app.use('/conductor', conductorRoutes);

// Inicio
app.get('/', (req, res) => {
    res.redirect('/ciudad');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
