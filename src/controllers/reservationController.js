const db = require('../config/database');

const crearReserva = async (req, res) => {
  const { customer_id, table_id, reservation_time, status, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_reserva(:customer_id, :table_id, :reservation_time, :status, :email); END;`,
      { customer_id, table_id, reservation_time, status, email }
    );
    await connection.commit();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const leerReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_reserva(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { customer_id, table_id, reservation_time, status, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_reserva(:id, :customer_id, :table_id, :reservation_time, :status, :email); END;`,
      { id, customer_id, table_id, reservation_time, status, email }
    );
    await connection.commit();
    res.status(200).json({ message: 'Reservation updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const borrarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_reserva(:id); END;`,
      { id }
    );
    await connection.commit();
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearReserva,
  leerReserva,
  actualizarReserva,
  borrarReserva
};
