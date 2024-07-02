const db = require('../config/database');

const crearUsuario = async (req, res) => {
  const { username, password, role_id, email } = req.body;
  console.log('Datos recibidos para crear usuario:', { username, password, role_id, email });

  try {
    const query = `BEGIN crear_usuario(:username, :password, :role_id, :email); END;`;
    const binds = { username, password, role_id, email };
    await db.execute(query, binds, { autoCommit: true });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    handleDatabaseError(err, res);
  }
};

const leerUsuario = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer usuario:', { id });

  try {
    const query = `BEGIN leer_usuario(:id, :cur); END;`;
    const binds = { id, cur: { dir: db.BIND_OUT, type: db.CURSOR } };
    const result = await db.execute(query, binds, { outFormat: db.OUT_FORMAT_OBJECT });

    const cursor = result.outBinds.cur;
    const users = [];
    let row;
    while ((row = await cursor.getRow())) {
      users.push(row);
    }
    await cursor.close();

    res.status(200).json(users);
  } catch (err) {
    console.error('Error reading user:', err);
    handleDatabaseError(err, res);
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, role_id, email } = req.body;
  console.log('Datos recibidos para actualizar usuario:', { id, username, password, role_id, email });

  try {
    const query = `BEGIN actualizar_usuario(:id, :username, :password, :role_id, :email); END;`;
    const binds = { id, username, password, role_id, email };
    await db.execute(query, binds, { autoCommit: true });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    handleDatabaseError(err, res);
  }
};

const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar usuario:', { id });

  try {
    const query = `BEGIN borrar_usuario(:id); END;`;
    const binds = { id };
    await db.execute(query, binds, { autoCommit: true });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    handleDatabaseError(err, res);
  }
};

const handleDatabaseError = (err, res) => {
  if (err.errorNum === 1) {
    res.status(400).json({ error: 'Duplicate entry' });
  } else if (err.errorNum === 1400) {
    res.status(400).json({ error: 'Missing required fields' });
  } else if (err.errorNum === 2291) {
    res.status(400).json({ error: 'Foreign key constraint violated' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  crearUsuario,
  leerUsuario,
  actualizarUsuario,
  borrarUsuario
};
