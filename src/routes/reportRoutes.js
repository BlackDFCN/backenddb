const express = require('express');
const { generarReporteDiario, generarReporteSemanal, generarReporteMensual } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/daily', protect, generarReporteDiario);
router.post('/weekly', protect, generarReporteSemanal);
router.post('/monthly', protect, generarReporteMensual);

module.exports = router;
