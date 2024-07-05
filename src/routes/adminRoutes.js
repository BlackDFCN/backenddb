const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');
const reportRoutes = require('./reportRoutes');
const reservationRoutes = require('./reservationRoutes');
const roleRoutes = require('./roleRoutes');
const tableRoutes = require('./tableRoutes');
const userRoutes = require('./userRoutes');

router.use('/customers', customerRoutes);
router.use('/employees', employeeRoutes);
router.use('/reports', reportRoutes);
router.use('/reservations', reservationRoutes);
router.use('/roles', roleRoutes);
router.use('/tables', tableRoutes); // Asegúrate de que esto esté presente
router.use('/users', userRoutes);

module.exports = router;
