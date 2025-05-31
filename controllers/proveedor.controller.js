const pool = require('../db');

exports.listar = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM proveedor ORDER BY nombre');
        res.render('proveedor/proveedor-list', {
            proveedores: resultado.rows,
        });
    } catch (error) {
        console.error('Error al listar proveedores:', error);
        res.status(500).send('Error al obtener proveedores');
    }
};

exports.guardar = async (req, res) => {
    const { id, nombre, direccion, contacto } = req.body;
    await pool.query('INSERT INTO proveedor (id, nombre, direccion, contacto) VALUES ($1, $2, $3, $4)', [id, nombre, direccion, contacto]);
    res.redirect('/proveedor');
};

exports.eliminar = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM proveedor WHERE id = $1', [id]);
    res.redirect('/proveedor');
};

exports.editar = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, contacto } = req.body;
    await pool.query('UPDATE proveedor SET nombre = $1, direccion = $2, contacto = $3 WHERE id = $4', [nombre, direccion, contacto, id]);
    res.redirect('/proveedor');
};
