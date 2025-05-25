const db = require('../db');
const ciudadController = require('./ciudad.controller');

// Mostrar listado
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await db.query(`
      SELECT cliente.*, ciudad.nombre AS nombre_ciudad 
      FROM cliente 
      LEFT JOIN ciudad ON cliente.cod_ciudad = ciudad.codigo
    `);
        const ciudades = await ciudadController.getCiudades();

        res.render('cliente/cliente-list', {
            clientes: clientes.rows,
            ciudades
        });
    } catch (error) {
        res.status(500).send('Error al listar clientes');
    }
};

// Formulario crear
exports.formularioCrear = async (req, res) => {
    try {
        const ciudades = await ciudadController.getCiudades(); // reutilización aquí
        res.render('cliente/cliente-form', { cliente: null, ciudades });
    } catch (error) {
        res.status(500).send('Error al cargar formulario');
    }
};

// Guardar nuevo
exports.guardarCliente = async (req, res) => {
    const { id, nombre, direccion, cod_ciudad } = req.body;
    try {
        await db.query('INSERT INTO cliente (id, nombre, direccion, cod_ciudad) VALUES ($1, $2, $3, $4)', [
            id,
            nombre,
            direccion,
            cod_ciudad === '' ? null : cod_ciudad
        ]);
        res.redirect('/cliente');
    } catch (error) {
        res.status(500).send('Error al guardar cliente');
    }
};

// Formulario editar
exports.formularioEditar = async (req, res) => {
    try {
        const cliente = await db.query('SELECT * FROM cliente WHERE id = $1', [req.params.id]);
        const ciudades = await ciudadController.getCiudades(); // reutilización aquí

        if (cliente.rows.length > 0) {
            res.render('cliente/cliente-form', {
                cliente: cliente.rows[0],
                ciudades
            });
        } else {
            res.redirect('/cliente');
        }
    } catch (error) {
        res.status(500).send('Error al cargar formulario de edición');
    }
};

// Editar cliente
exports.editarCliente = async (req, res) => {
    const { nombre, direccion, cod_ciudad } = req.body;
    try {
        await db.query(
            'UPDATE cliente SET nombre = $1, direccion = $2, cod_ciudad = $3 WHERE id = $4',
            [nombre, direccion, cod_ciudad === '' ? null : cod_ciudad, req.params.id]
        );
        res.redirect('/cliente');
    } catch (error) {
        res.status(500).send('Error al editar cliente');
    }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
    try {
        await db.query('DELETE FROM cliente WHERE id = $1', [req.params.id]);
        res.redirect('/cliente');
    } catch (error) {
        res.status(500).send('Error al eliminar cliente');
    }
};
