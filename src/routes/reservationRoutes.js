const express = require('express');
const { crearReserva, leerReserva, actualizarReserva, borrarReserva } = require('../controllers/reservationController');
const { validateReservation } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear una nueva reserva
router.post('/', authUser, validateReservation, crearReserva);

// Ruta para leer una reserva específica por ID
router.get('/:id', authUser, leerReserva);

// Ruta para actualizar una reserva específica por ID
router.put('/:id', authUser, validateReservation, actualizarReserva);

// Ruta para borrar una reserva específica por ID
router.delete('/:id', authUser, borrarReserva);

module.exports = router;
