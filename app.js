const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');
const app = express();

// Configuración
app.engine('ejs', engine); // 👈 Usa ejs-mate como motor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Rutas
const ciudadRoutes = require('./routes/ciudad.routes');
app.use('/ciudad', ciudadRoutes);

const clienteRoutes = require('./routes/cliente.routes');
app.use('/cliente', clienteRoutes);

const conductorRoutes = require('./routes/conductor.routes');
app.use('/conductor', conductorRoutes);

const proveedorRoutes = require('./routes/proveedor.routes');
app.use('/proveedor', proveedorRoutes);

const rutaRoutes = require('./routes/ruta.routes');
app.use('/ruta', rutaRoutes);

const ventaRoutes = require('./routes/venta.routes');
app.use('/venta', ventaRoutes);

const reporteRoutes = require('./routes/reporte.routes');
app.use('/reporte', reporteRoutes);

const sedeRoutes = require('./routes/sede.routes');
app.use('/sede', sedeRoutes);

// Inicio
app.get('/', (req, res) => {
    res.redirect('/ciudad');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
