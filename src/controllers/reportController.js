const db = require('../config/database');

// Generar reporte diario
const generarReporteDiario = async (req, res) => {
  const { report_date } = req.body;
  console.log('Datos recibidos para generar reporte diario:', { report_date });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_diario(:report_date); END;`,
      { report_date }
    );
    await connection.commit();
    console.log('Reporte diario generado exitosamente');
    res.status(201).json({ message: 'Reporte diario generado exitosamente' });
  } catch (err) {
    console.error('Error al generar reporte diario:', err.message);
    res.status(500).json({ error: 'Error al generar reporte diario' });
  }
};

// Generar reporte semanal
const generarReporteSemanal = async (req, res) => {
  const { start_date, end_date } = req.body;
  console.log('Datos recibidos para generar reporte semanal:', { start_date, end_date });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_semanal(:start_date, :end_date); END;`,
      { start_date, end_date }
    );
    await connection.commit();
    console.log('Reporte semanal generado exitosamente');
    res.status(201).json({ message: 'Reporte semanal generado exitosamente' });
  } catch (err) {
    console.error('Error al generar reporte semanal:', err.message);
    res.status(500).json({ error: 'Error al generar reporte semanal' });
  }
};

// Generar reporte mensual
const generarReporteMensual = async (req, res) => {
  const { report_month } = req.body;
  console.log('Datos recibidos para generar reporte mensual:', { report_month });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_mensual(:report_month); END;`,
      { report_month }
    );
    await connection.commit();
    console.log('Reporte mensual generado exitosamente');
    res.status(201).json({ message: 'Reporte mensual generado exitosamente' });
  } catch (err) {
    console.error('Error al generar reporte mensual:', err.message);
    res.status(500).json({ error: 'Error al generar reporte mensual' });
  }
};

module.exports = {
  generarReporteDiario,
  generarReporteSemanal,
  generarReporteMensual
};
