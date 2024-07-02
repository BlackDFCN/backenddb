const db = require('../config/database');

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  console.log('Datos recibidos para crear cliente:', { first_name, last_name, phone_number, email });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN crear_cliente(:first_name, :last_name, :phone_number, :email); END;`,
      { first_name, last_name, phone_number, email }
    );
    await connection.commit();
    console.log('Cliente creado exitosamente');
    res.status(201).json({ message: 'Cliente creado exitosamente' });
  } catch (err) {
    console.error('Error al crear cliente:', err.message);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Leer un cliente por ID
const leerCliente = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer cliente:', { id });
  
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `BEGIN leer_cliente(:id, :cur); END;`,
      { id }
    );
    res.status(200).json(result.outBinds.cur);
    console.log('Cliente leído exitosamente');
  } catch (err) {
    console.error('Error al leer cliente:', err.message);
    res.status(500).json({ error: 'Error al leer cliente' });
  }
};

// Actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email } = req.body;
  console.log('Datos recibidos para actualizar cliente:', { id, first_name, last_name, phone_number, email });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN actualizar_cliente(:id, :first_name, :last_name, :phone_number, :email); END;`,
      { id, first_name, last_name, phone_number, email }
    );
    await connection.commit();
    console.log('Cliente actualizado exitosamente');
    res.status(200).json({ message: 'Cliente actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar cliente:', err.message);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Borrar un cliente por ID
const borrarCliente = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar cliente:', { id });
  
  try {
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      `BEGIN borrar_cliente(:id); END;`,
      { id }
    );
    await connection.commit();
    console.log('Cliente borrado exitosamente');
    res.status(200).json({ message: 'Cliente borrado exitosamente' });
  } catch (err) {
    console.error('Error al borrar cliente:', err.message);
    res.status(500).json({ error: 'Error al borrar cliente' });
  }
};

module.exports = {
  crearCliente,
  leerCliente,
  actualizarCliente,
  borrarCliente
};
