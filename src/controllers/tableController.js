const oracledb = require('oracledb');
const db = require('../config/database');

// Obtener todas las mesas
const obtenerMesas = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const result = await connection.execute(`SELECT * FROM Mesas`, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    await connection.close();

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener mesas:', err.message);
    res.status(500).json({ error: 'Error al obtener mesas' });
  }
};

// Crear una nueva mesa
const crearMesa = async (req, res) => {
  const { table_number, capacity, status } = req.body;
  console.log('Datos recibidos para crear mesa:', { table_number, capacity, status });

  try {
    const connection = await db.getConnection();
    await connection.execute(`BEGIN crear_mesa(:table_number, :capacity, :status); END;`, {
      table_number,
      capacity,
      status,
    });
    await connection.commit();
    await connection.close();
    console.log('Mesa creada exitosamente');
    res.status(201).json({ message: 'Mesa creada exitosamente' });
  } catch (err) {
    console.error('Error al crear mesa:', err.message);
    res.status(500).json({ error: 'Error al crear mesa' });
  }
};

// Leer una mesa por ID
const leerMesa = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para leer mesa:', { id });

  try {
    const connection = await db.getConnection();
    const result = await connection.execute(`BEGIN leer_mesa(:id, :cur); END;`, {
      id,
      cur: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });

    const resultSet = result.outBinds.cur;
    const rows = await resultSet.getRows();
    await resultSet.close();
    await connection.close();

    console.log('Mesa leída exitosamente');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al leer mesa:', err.message);
    res.status(500).json({ error: 'Error al leer mesa' });
  }
};

// Actualizar una mesa por ID
const actualizarMesa = async (req, res) => {
  const { id } = req.params;
  const { table_number, capacity, status } = req.body;
  console.log('Datos recibidos para actualizar mesa:', { id, table_number, capacity, status });

  try {
    const connection = await db.getConnection();
    await connection.execute(`BEGIN actualizar_mesa(:id, :table_number, :capacity, :status); END;`, {
      id,
      table_number,
      capacity,
      status,
    });
    await connection.commit();
    await connection.close();
    console.log('Mesa actualizada exitosamente');
    res.status(200).json({ message: 'Mesa actualizada exitosamente' });
  } catch (err) {
    console.error('Error al actualizar mesa:', err.message);
    res.status(500).json({ error: 'Error al actualizar mesa' });
  }
};

// Borrar una mesa por ID
const borrarMesa = async (req, res) => {
  const { id } = req.params;
  console.log('Datos recibidos para borrar mesa:', { id });

  try {
    const connection = await db.getConnection();
    await connection.execute(`BEGIN borrar_mesa(:id); END;`, { id });
    await connection.commit();
    await connection.close();
    console.log('Mesa borrada exitosamente');
    res.status(200).json({ message: 'Mesa borrada exitosamente' });
  } catch (err) {
    console.error('Error al borrar mesa:', err.message);
    res.status(500).json({ error: 'Error al borrar mesa' });
  }
};

module.exports = {
  obtenerMesas,
  crearMesa,
  leerMesa,
  actualizarMesa,
  borrarMesa,
};
