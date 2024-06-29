const express = require('express');
const router = express.Router();
const { makeReservation, getReservations, getAllReservations, updateReservation, cancelReservation, assignTable } = require('../controllers/reservationController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/', authenticateToken, makeReservation); // Todos los roles
router.get('/', authenticateToken, getReservations); // Todos los roles
router.get('/all', authenticateToken, authorizeRoles(1, 2), getAllReservations); // Administradores y trabajadores
router.put('/:id', authenticateToken, authorizeRoles(1, 2), updateReservation); // Administradores y trabajadores
router.put('/:id/assign', authenticateToken, authorizeRoles(1, 2), assignTable); // Administradores y trabajadores
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), cancelReservation); // Administradores y trabajadores

module.exports = router;
