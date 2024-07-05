const express = require('express');
const { crearEmpleado, leerEmpleado, actualizarEmpleado, borrarEmpleado } = require('../controllers/employeeController');
const { validateEmployee } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear un nuevo empleado
router.post('/', authUser, validateEmployee, crearEmpleado);

// Ruta para leer un empleado específico por ID
router.get('/:id', authUser, leerEmpleado);

// Ruta para actualizar un empleado específico por ID
router.put('/:id', authUser, validateEmployee, actualizarEmpleado);

// Ruta para borrar un empleado específico por ID
router.delete('/:id', authUser, borrarEmpleado);

module.exports = router;
