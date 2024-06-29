const oracledb = require('oracledb');

async function createTable(req, res) {
  const { table_number, capacity, status } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO Mesas (table_number, capacity, status)
       VALUES (:table_number, :capacity, :status)`,
      { table_number, capacity, status },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'Table created successfully' });
  } catch (err) {
    console.error('Error creating table:', err);
    res.status(500).json({ message: 'Error creating table', error: err.message });
  }
}

async function getTables(req, res) {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM Mesas`);
    await connection.close();
    const tables = result.rows.map(row => ({
      table_id: row[0],
      table_number: row[1],
      capacity: row[2],
      status: row[3]
    }));
    res.status(200).json(tables);
  } catch (err) {
    console.error('Error fetching tables:', err);
    res.status(500).json({ message: 'Error fetching tables', error: err.message });
  }
}

async function updateTable(req, res) {
  const tableId = req.params.id;
  const { table_number, capacity, status } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE Mesas SET table_number = :table_number, capacity = :capacity, status = :status WHERE table_id = :tableId`,
      { table_number, capacity, status, tableId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'Table updated successfully' });
  } catch (err) {
    console.error('Error updating table:', err);
    res.status(500).json({ message: 'Error updating table', error: err.message });
  }
}

async function deleteTable(req, res) {
  const tableId = req.params.id;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `DELETE FROM Mesas WHERE table_id = :tableId`,
      { tableId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (err) {
    console.error('Error deleting table:', err);
    res.status(500).json({ message: 'Error deleting table', error: err.message });
  }
}

module.exports = { createTable, getTables, updateTable, deleteTable };
