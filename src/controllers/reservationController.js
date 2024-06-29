const oracledb = require('oracledb');

async function makeReservation(req, res) {
  const { customer_id, table_id, reservation_time, status } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO Reservas (customer_id, table_id, reservation_time, status)
       VALUES (:customer_id, :table_id, :reservation_time, :status)`,
      { customer_id, table_id, reservation_time, status },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'Reservation made successfully' });
  } catch (err) {
    console.error('Error making reservation:', err);
    res.status(500).json({ message: 'Error making reservation', error: err.message });
  }
}

async function getReservations(req, res) {
  const userId = req.user.userId;
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM Reservas WHERE customer_id = :userId`,
      { userId }
    );
    await connection.close();
    const reservations = result.rows.map(row => ({
      reservation_id: row[0],
      customer_id: row[1],
      table_id: row[2],
      reservation_time: row[3],
      status: row[4],
      created_at: row[5],
      updated_at: row[6]
    }));
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Error fetching reservations', error: err.message });
  }
}

async function getAllReservations(req, res) {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM Reservas`);
    await connection.close();
    const reservations = result.rows.map(row => ({
      reservation_id: row[0],
      customer_id: row[1],
      table_id: row[2],
      reservation_time: row[3],
      status: row[4],
      created_at: row[5],
      updated_at: row[6]
    }));
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Error fetching reservations', error: err.message });
  }
}

async function updateReservation(req, res) {
  const reservationId = req.params.id;
  const { customer_id, table_id, reservation_time, status } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE Reservas SET customer_id = :customer_id, table_id = :table_id, reservation_time = :reservation_time, status = :status WHERE reservation_id = :reservationId`,
      { customer_id, table_id, reservation_time, status, reservationId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'Reservation updated successfully' });
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ message: 'Error updating reservation', error: err.message });
  }
}

async function cancelReservation(req, res) {
  const reservationId = req.params.id;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `DELETE FROM Reservas WHERE reservation_id = :reservationId`,
      { reservationId },
      { autoCommit: true }
    );
    await connection.execute(
      `UPDATE Mesas SET status = 'disponible' WHERE table_id = (SELECT table_id FROM Reservas WHERE reservation_id = :reservationId)`,
      { reservationId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling reservation:', err);
    res.status(500).json({ message: 'Error cancelling reservation', error: err.message });
  }
}

async function assignTable(req, res) {
  const reservationId = req.params.id;
  const { tableId } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE Reservas SET table_id = :tableId WHERE reservation_id = :reservationId`,
      { tableId, reservationId },
      { autoCommit: true }
    );
    await connection.execute(
      `UPDATE Mesas SET status = 'reservada' WHERE table_id = :tableId`,
      { tableId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'Table assigned successfully' });
  } catch (err) {
    console.error('Error assigning table:', err);
    res.status(500).json({ message: 'Error assigning table', error: err.message });
  }
}

module.exports = { makeReservation, getReservations, getAllReservations, updateReservation, cancelReservation, assignTable };
