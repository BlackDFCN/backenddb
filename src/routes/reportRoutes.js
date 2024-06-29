const express = require('express');
const router = express.Router();
const { getDailyReport, getWeeklyReport, getMonthlyReport } = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/daily/:reportDate', authenticateToken, authorizeRoles(1, 2), getDailyReport); // Administradores y trabajadores
router.get('/weekly/:startDate/:endDate', authenticateToken, authorizeRoles(1, 2), getWeeklyReport); // Administradores y trabajadores
router.get('/monthly/:reportMonth', authenticateToken, authorizeRoles(1, 2), getMonthlyReport); // Administradores y trabajadores

module.exports = router;
