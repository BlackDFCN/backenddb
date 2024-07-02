const db = require('../config/database');

// Crear un nuevo empleado
const crearEmpleado = async (req, res) => {
  const { user_id, first_name, last_name, position, hire_date } = req.body;
  console.log('Datos recibidos para crear empleado:', { user_id, first_name, last_name, position, hire_date });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_empleado(:user_id, :first_name, :last_name, :position, :hire_date); END;`,
      { user_id, first_name, last_name, position, hire_date }
    );
    await connection.commit();
    console.log('Empleado creado exitosamente');
    res.status(201).json({ message: 'Empleado creado exitosamente' });
  } catch (err) {
    console.error('Error al crear empleado:', err.message);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

// Leer un empleado por ID
const leerEmpleado = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer empleado:', { id });
  
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_empleado(:id, :cur); END;`,
      { id }
    );
    console.log('Empleado leído exitosamente');
    res.status(200).json(result.outBinds.cur);
  } catch (err) {
    console.error('Error al leer empleado:', err.message);
    res.status(500).json({ error: 'Error al leer empleado' });
  }
};

// Actualizar un empleado por ID
const actualizarEmpleado = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, position, hire_date } = req.body;
  console.log('Datos recibidos para actualizar empleado:', { id, first_name, last_name, position, hire_date });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_empleado(:id, :first_name, :last_name, :position, :hire_date); END;`,
      { id, first_name, last_name, position, hire_date }
    );
    await connection.commit();
    console.log('Empleado actualizado exitosamente');
    res.status(200).json({ message: 'Empleado actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar empleado:', err.message);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

// Borrar un empleado por ID
const borrarEmpleado = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar empleado:', { id });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_empleado(:id); END;`,
      { id }
    );
    await connection.commit();
    console.log('Empleado borrado exitosamente');
    res.status(200).json({ message: 'Empleado borrado exitosamente' });
  } catch (err) {
    console.error('Error al borrar empleado:', err.message);
    res.status(500).json({ error: 'Error al borrar empleado' });
  }
};

module.exports = {
  crearEmpleado,
  leerEmpleado,
  actualizarEmpleado,
  borrarEmpleado
};
