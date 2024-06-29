const oracledb = require('oracledb');

async function getDailyReport(req, res) {
  const { reportDate } = req.params;
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    await connection.execute(
      `BEGIN generar_reporte_diario(:reportDate); END;`,
      { reportDate }
    );
    const report = await connection.execute(
      `SELECT * FROM ReporteReservas WHERE report_date = :reportDate`,
      { reportDate }
    );
    await connection.close();
    res.status(200).json(report.rows[0]);
  } catch (err) {
    console.error('Error fetching daily report:', err);
    res.status(500).json({ message: 'Error fetching daily report', error: err.message });
  }
}

async function getWeeklyReport(req, res) {
  const { startDate, endDate } = req.params;
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    await connection.execute(
      `BEGIN generar_reporte_semanal(:startDate, :endDate); END;`,
      { startDate, endDate }
    );
    const report = await connection.execute(
      `SELECT * FROM ReporteReservas WHERE report_date = :startDate || ' - ' || :endDate`,
      { startDate, endDate }
    );
    await connection.close();
    res.status(200).json(report.rows[0]);
  } catch (err) {
    console.error('Error fetching weekly report:', err);
    res.status(500).json({ message: 'Error fetching weekly report', error: err.message });
  }
}

async function getMonthlyReport(req, res) {
  const { reportMonth } = req.params;
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    await connection.execute(
      `BEGIN generar_reporte_mensual(:reportMonth); END;`,
      { reportMonth }
    );
    const report = await connection.execute(
      `SELECT * FROM ReporteReservas WHERE report_date = :reportMonth`,
      { reportMonth }
    );
    await connection.close();
    res.status(200).json(report.rows[0]);
  } catch (err) {
    console.error('Error fetching monthly report:', err);
    res.status(500).json({ message: 'Error fetching monthly report', error: err.message });
  }
}

module.exports = { getDailyReport, getWeeklyReport, getMonthlyReport };
