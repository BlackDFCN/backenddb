const db = require('../config/database');

const crearEmpleado = async (req, res) => {
  const { user_id, first_name, last_name, position, hire_date } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_empleado(:user_id, :first_name, :last_name, :position, :hire_date); END;`,
      { user_id, first_name, last_name, position, hire_date }
    );
    await connection.commit();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const leerEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_empleado(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarEmpleado = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, position, hire_date } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_empleado(:id, :first_name, :last_name, :position, :hire_date); END;`,
      { id, first_name, last_name, position, hire_date }
    );
    await connection.commit();
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const borrarEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_empleado(:id); END;`,
      { id }
    );
    await connection.commit();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearEmpleado,
  leerEmpleado,
  actualizarEmpleado,
  borrarEmpleado
};
