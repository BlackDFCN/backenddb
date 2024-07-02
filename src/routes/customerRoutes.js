const express = require('express');
const { crearCliente, leerCliente, actualizarCliente, borrarCliente } = require('../controllers/clienteController');
const { validateCustomer } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear un nuevo cliente
router.post('/', protect, validateCustomer, crearCliente);

// Ruta para leer un cliente específico por ID
router.get('/:id', protect, leerCliente);

// Ruta para actualizar un cliente específico por ID
router.put('/:id', protect, validateCustomer, actualizarCliente);

// Ruta para borrar un cliente específico por ID
router.delete('/:id', protect, borrarCliente);

module.exports = router;
