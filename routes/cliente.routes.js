const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// Mostrar todos los clientes
router.get('/', clienteController.listarClientes);

// Formulario para agregar cliente
router.get('/nuevo', clienteController.formularioCrear);

// Guardar nuevo cliente
router.post('/guardar', clienteController.guardarCliente);

// Formulario para editar cliente
router.get('/editar/:id', clienteController.formularioEditar);

// Editar cliente existente
router.post('/editar/:id', clienteController.editarCliente);

// Eliminar cliente
router.get('/eliminar/:id', clienteController.eliminarCliente);

module.exports = router;