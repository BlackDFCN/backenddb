const db = require('../config/database');

// Crear una nueva reserva
const crearReserva = async (req, res) => {
  const { customer_id, table_id, reservation_time, status, email } = req.body;
  console.log('Datos recibidos para crear reserva:', { customer_id, table_id, reservation_time, status, email });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_reserva(:customer_id, :table_id, :reservation_time, :status, :email); END;`,
      { customer_id, table_id, reservation_time, status, email }
    );
    await connection.commit();
    console.log('Reserva creada exitosamente');
    res.status(201).json({ message: 'Reserva creada exitosamente' });
  } catch (err) {
    console.error('Error al crear reserva:', err.message);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
};

// Leer una reserva por ID
const leerReserva = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer reserva:', { id });

  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_reserva(:id, :cur); END;`,
      { id }
    );
    console.log('Reserva leída exitosamente');
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    console.error('Error al leer reserva:', err.message);
    res.status(500).json({ error: 'Error al leer reserva' });
  }
};

// Actualizar una reserva por ID
const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { customer_id, table_id, reservation_time, status, email } = req.body;
  console.log('Datos recibidos para actualizar reserva:', { id, customer_id, table_id, reservation_time, status, email });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_reserva(:id, :customer_id, :table_id, :reservation_time, :status, :email); END;`,
      { id, customer_id, table_id, reservation_time, status, email }
    );
    await connection.commit();
    console.log('Reserva actualizada exitosamente');
    res.status(200).json({ message: 'Reserva actualizada exitosamente' });
  } catch (err) {
    console.error('Error al actualizar reserva:', err.message);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

// Borrar una reserva por ID
const borrarReserva = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar reserva:', { id });

  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_reserva(:id); END;`,
      { id }
    );
    await connection.commit();
    console.log('Reserva borrada exitosamente');
    res.status(200).json({ message: 'Reserva borrada exitosamente' });
  } catch (err) {
    console.error('Error al borrar reserva:', err.message);
    res.status(500).json({ error: 'Error al borrar reserva' });
  }
};

module.exports = {
  crearReserva,
  leerReserva,
  actualizarReserva,
  borrarReserva
};
