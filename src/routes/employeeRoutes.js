const express = require('express');
const { crearEmpleado, leerEmpleado, actualizarEmpleado, borrarEmpleado } = require('../controllers/employeeController');
const { validateEmployee } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, validateEmployee, crearEmpleado);
router.get('/:id', protect, leerEmpleado);
router.put('/:id', protect, validateEmployee, actualizarEmpleado);
router.delete('/:id', protect, borrarEmpleado);

module.exports = router;
