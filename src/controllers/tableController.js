const db = require('../config/database');

const crearMesa = async (req, res) => {
  const { table_number, capacity, status } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_mesa(:table_number, :capacity, :status); END;`,
      { table_number, capacity, status }
    );
    await connection.commit();
    res.status(201).json({ message: 'Table created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const leerMesa = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_mesa(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarMesa = async (req, res) => {
  const { id } = req.params;
  const { table_number, capacity, status } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_mesa(:id, :table_number, :capacity, :status); END;`,
      { id, table_number, capacity, status }
    );
    await connection.commit();
    res.status(200).json({ message: 'Table updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const borrarMesa = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_mesa(:id); END;`,
      { id }
    );
    await connection.commit();
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearMesa,
  leerMesa,
  actualizarMesa,
  borrarMesa
};
