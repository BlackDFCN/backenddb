const express = require('express');
const { crearCliente, leerCliente, actualizarCliente, borrarCliente } = require('../controllers//customerController');
const { validateCustomer } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear un nuevo cliente
router.post('/', authUser, validateCustomer, crearCliente);

// Ruta para leer un cliente específico por ID
router.get('/:id', authUser, leerCliente);

// Ruta para actualizar un cliente específico por ID
router.put('/:id', authUser, validateCustomer, actualizarCliente);

// Ruta para borrar un cliente específico por ID
router.delete('/:id', authUser, borrarCliente);

module.exports = router;
