const express = require('express');
const { generarReporteDiario, generarReporteSemanal, generarReporteMensual } = require('../controllers/reportController');
const { validateReport } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// Ruta para generar reporte diario
router.post('/diario', authUser, validateReport('diario'), generarReporteDiario);

// Ruta para generar reporte semanal
router.post('/semanal', authUser, validateReport('semanal'), generarReporteSemanal);

// Ruta para generar reporte mensual
router.post('/mensual', authUser, validateReport('mensual'), generarReporteMensual);

module.exports = router;
