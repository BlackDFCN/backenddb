const express = require('express');
const { crearReserva, leerReserva, actualizarReserva, borrarReserva } = require('../controllers/reservaController');
const { validateReservation } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear una nueva reserva
router.post('/', protect, validateReservation, crearReserva);

// Ruta para leer una reserva específica por ID
router.get('/:id', protect, leerReserva);

// Ruta para actualizar una reserva específica por ID
router.put('/:id', protect, validateReservation, actualizarReserva);

// Ruta para borrar una reserva específica por ID
router.delete('/:id', protect, borrarReserva);

module.exports = router;
