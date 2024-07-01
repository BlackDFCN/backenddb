const express = require('express');
const { crearCliente, leerCliente, actualizarCliente, borrarCliente } = require('../controllers/customerController');
const { validateCustomer } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, validateCustomer, crearCliente);
router.get('/:id', protect, leerCliente);
router.put('/:id', protect, validateCustomer, actualizarCliente);
router.delete('/:id', protect, borrarCliente);

module.exports = router;
