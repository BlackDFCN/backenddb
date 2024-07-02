const express = require('express');
const { generarReporteDiario, generarReporteSemanal, generarReporteMensual } = require('../controllers/reporteController');
const { validateReport } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Ruta para generar reporte diario
router.post('/diario', protect, validateReport('diario'), generarReporteDiario);

// Ruta para generar reporte semanal
router.post('/semanal', protect, validateReport('semanal'), generarReporteSemanal);

// Ruta para generar reporte mensual
router.post('/mensual', protect, validateReport('mensual'), generarReporteMensual);

module.exports = router;
