const db = require('../config/database');

const generarReporteDiario = async (req, res) => {
  const { report_date } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_diario(:report_date); END;`,
      { report_date }
    );
    await connection.commit();
    res.status(201).json({ message: 'Daily report generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generarReporteSemanal = async (req, res) => {
  const { start_date, end_date } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_semanal(:start_date, :end_date); END;`,
      { start_date, end_date }
    );
    await connection.commit();
    res.status(201).json({ message: 'Weekly report generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generarReporteMensual = async (req, res) => {
  const { report_month } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN generar_reporte_mensual(:report_month); END;`,
      { report_month }
    );
    await connection.commit();
    res.status(201).json({ message: 'Monthly report generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  generarReporteDiario,
  generarReporteSemanal,
  generarReporteMensual
};
