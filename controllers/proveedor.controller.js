const db = require('../db');
const sedeController = require('./sede.controller');

exports.listar = async (req, res) => {
    try {
        const resultado = await db.query(`
            SELECT proveedor.*, sede.nombre AS nombre_sede
            FROM proveedor
            LEFT JOIN sede ON proveedor.id_sede = sede.id
            ORDER BY proveedor.nombre;
        `);
        const sedes = await sedeController.getSedes(); // 👈 obtener sedes

        res.render('proveedor/proveedor-list', {
            proveedores: resultado.rows,
            sedes // 👈 pasar al render
        });
    } catch (error) {
        console.error('Error al listar proveedores:', error);
        res.status(500).send('Error al obtener proveedores');
    }
};

exports.guardar = async (req, res) => {
    const { id, nombre, direccion, contacto, id_sede } = req.body;
    await db.query(
        'INSERT INTO proveedor (id, nombre, direccion, contacto, id_sede) VALUES ($1, $2, $3, $4, $5)',
        [id, nombre, direccion, contacto, id_sede]
    );
    res.redirect('/proveedor');
};

exports.editar = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, contacto, id_sede } = req.body;
    await db.query(
        'UPDATE proveedor SET nombre = $1, direccion = $2, contacto = $3, id_sede = $4 WHERE id = $5',
        [nombre, direccion, contacto, id_sede, id]
    );
    res.redirect('/proveedor');
};

exports.eliminar = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM proveedor WHERE id = $1', [id]);
    res.redirect('/proveedor');
};