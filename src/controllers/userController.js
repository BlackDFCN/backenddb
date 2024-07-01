const db = require('../config/database');

const crearUsuario = async (req, res) => {
  const { username, password, role_id, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_usuario(:username, :password, :role_id, :email); END;`,
      { username, password, role_id, email }
    );
    await connection.commit();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const leerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_usuario(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, role_id, email } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_usuario(:id, :username, :password, :role_id, :email); END;`,
      { id, username, password, role_id, email }
    );
    await connection.commit();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_usuario(:id); END;`,
      { id }
    );
    await connection.commit();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
  leerUsuario,
  actualizarUsuario,
  borrarUsuario
};
