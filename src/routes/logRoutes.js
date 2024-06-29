const express = require('express');
const router = express.Router();
const { getChangeLogs } = require('../controllers/logController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles(1), getChangeLogs); // Solo administradores

module.exports = router;
