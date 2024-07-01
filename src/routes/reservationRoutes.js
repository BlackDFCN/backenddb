const express = require('express');
const { crearReserva, leerReserva, actualizarReserva, borrarReserva } = require('../controllers/reservationController');
const { validateReservation } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, validateReservation, crearReserva);
router.get('/:id', protect, leerReserva);
router.put('/:id', protect, validateReservation, actualizarReserva);
router.delete('/:id', protect, borrarReserva);

module.exports = router;
