const bcrypt = require('bcrypt');
const db = require('../config/database');

const crearUsuario = async (req, res) => {
  const { username, password, email } = req.body; // Eliminado role_id ya que se asignará automáticamente
  console.log('Datos recibidos para crear usuario:', { username, password, email });

  try {
    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `BEGIN crear_usuario(:username, :password, :role_id, :email); END;`;
    const binds = { username, password: hashedPassword, role_id: 1, email }; // role_id se asigna a 1 automáticamente
    await db.execute(query, binds, { autoCommit: true });
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    console.error('Error al crear usuario:', err);
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
    console.error('Error al leer usuario:', err);
    handleDatabaseError(err, res);
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  console.log('Datos recibidos para actualizar usuario:', { id, username, password, email });

  try {
    // Hashear la nueva contraseña antes de actualizarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `BEGIN actualizar_usuario(:id, :username, :password, :role_id, :email); END;`;
    const binds = { id, username, password: hashedPassword, role_id: 1, email }; // role_id se asigna a 1 automáticamente
    await db.execute(query, binds, { autoCommit: true });
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
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
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    console.error('Error al borrar usuario:', err);
    handleDatabaseError(err, res);
  }
};

const handleDatabaseError = (err, res) => {
  if (err.errorNum === 1) {
    res.status(400).json({ error: 'Entrada duplicada: El nombre de usuario o el correo electrónico ya existen' });
  } else if (err.errorNum === 1400) {
    res.status(400).json({ error: 'Campos requeridos faltantes' });
  } else if (err.errorNum === 2291) {
    res.status(400).json({ error: 'Violación de restricción de clave foránea' });
  } else {
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
};

module.exports = {
  crearUsuario,
  leerUsuario,
  actualizarUsuario,
  borrarUsuario
};
