const db = require('../config/database');

// Crear un nuevo rol
const crearRol = async (req, res) => {
  const { role_name } = req.body;
  console.log('Datos recibidos para crear rol:', { role_name });

  try {
    const query = `BEGIN crear_rol(:role_name); END;`;
    const binds = { role_name };
    await db.execute(query, binds, { autoCommit: true });
    res.status(201).json({ message: 'Rol creado exitosamente' });
  } catch (err) {
    console.error('Error al crear rol:', err);
    handleDatabaseError(err, res);
  }
};

// Leer un rol por ID
const leerRol = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer rol:', { id });

  try {
    const query = `BEGIN leer_rol(:id, :cur); END;`;
    const binds = { id, cur: { dir: db.BIND_OUT, type: db.CURSOR } };
    const result = await db.execute(query, binds, { outFormat: db.OUT_FORMAT_OBJECT });

    const cursor = result.outBinds.cur;
    const roles = [];
    let row;
    while ((row = await cursor.getRow())) {
      roles.push(row);
    }
    await cursor.close();

    res.status(200).json(roles);
  } catch (err) {
    console.error('Error al leer rol:', err);
    handleDatabaseError(err, res);
  }
};

// Actualizar un rol por ID
const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { role_name } = req.body;
  console.log('Datos recibidos para actualizar rol:', { id, role_name });

  try {
    const query = `BEGIN actualizar_rol(:id, :role_name); END;`;
    const binds = { id, role_name };
    await db.execute(query, binds, { autoCommit: true });
    res.status(200).json({ message: 'Rol actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar rol:', err);
    handleDatabaseError(err, res);
  }
};

// Borrar un rol por ID
const borrarRol = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar rol:', { id });

  try {
    const query = `BEGIN borrar_rol(:id); END;`;
    const binds = { id };
    await db.execute(query, binds, { autoCommit: true });
    res.status(200).json({ message: 'Rol borrado exitosamente' });
  } catch (err) {
    console.error('Error al borrar rol:', err);
    handleDatabaseError(err, res);
  }
};

// Manejo de errores de la base de datos
const handleDatabaseError = (err, res) => {
  if (err.errorNum === 1) {
    res.status(400).json({ error: 'Entrada duplicada: El nombre del rol ya existe' });
  } else if (err.errorNum === 1400) {
    res.status(400).json({ error: 'Campos requeridos faltantes' });
  } else if (err.errorNum === 2291) {
    res.status(400).json({ error: 'Violación de restricción de clave externa' });
  } else {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearRol,
  leerRol,
  actualizarRol,
  borrarRol
};
