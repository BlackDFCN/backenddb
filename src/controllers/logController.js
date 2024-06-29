const oracledb = require('oracledb');

async function getChangeLogs(req, res) {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM RegistroCambiosEstadoMesa`);
    await connection.close();

    const logs = result.rows.map(row => ({
      change_id: row[0],
      table_id: row[1],
      old_status: row[2],
      new_status: row[3],
      change_time: row[4]
    }));
    res.status(200).json(logs);
  } catch (err) {
    console.error('Error fetching change logs:', err);
    res.status(500).json({ message: 'Error fetching change logs', error: err.message });
  }
}

module.exports = { getChangeLogs };
