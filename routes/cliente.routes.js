const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const telefonosClienteController = require('../controllers/telefono_cliente.controller');

// Mostrar todos los clientes
router.get('/', clienteController.listarClientes);
router.get('/nuevo', clienteController.formularioCrear);
router.post('/guardar', clienteController.guardarCliente);
router.get('/editar/:id', clienteController.formularioEditar);
router.post('/editar/:id', clienteController.editarCliente);
router.get('/eliminar/:id', clienteController.eliminarCliente);

router.get('/telefono_cliente/listar/:id', telefonosClienteController.listar);
router.post('/telefono_cliente/agregar/:id', telefonosClienteController.agregar);
router.post('/telefono_cliente/editar/:id', telefonosClienteController.editar);
router.delete('/telefono_cliente/eliminar/:id', telefonosClienteController.eliminar);

module.exports = router;