const express = require('express');
const { crearEmpleado, leerEmpleado, actualizarEmpleado, borrarEmpleado } = require('../controllers/empleadoController');
const { validateEmployee } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear un nuevo empleado
router.post('/', protect, validateEmployee, crearEmpleado);

// Ruta para leer un empleado específico por ID
router.get('/:id', protect, leerEmpleado);

// Ruta para actualizar un empleado específico por ID
router.put('/:id', protect, validateEmployee, actualizarEmpleado);

// Ruta para borrar un empleado específico por ID
router.delete('/:id', protect, borrarEmpleado);

module.exports = router;
