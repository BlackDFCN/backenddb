const db = require('../config/database');

const crearCliente = async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_cliente(:first_name, :last_name, :phone_number, :email); END;`,
      { first_name, last_name, phone_number, email }
    );
    await connection.commit();
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const leerCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_cliente(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_cliente(:id, :first_name, :last_name, :phone_number, :email); END;`,
      { id, first_name, last_name, phone_number, email }
    );
    await connection.commit();
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const borrarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_cliente(:id); END;`,
      { id }
    );
    await connection.commit();
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearCliente,
  leerCliente,
  actualizarCliente,
  borrarCliente
};
