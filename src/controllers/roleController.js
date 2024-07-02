const db = require('../config/database');

const crearRol = async (req, res) => {
  const { role_name } = req.body;
  try {
    const query = `BEGIN crear_rol(:role_name); END;`;
    const binds = { role_name };
    await db.execute(query, binds);
    res.status(201).json({ message: 'Role created successfully' });
  } catch (err) {
    console.error('Error creating role:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearRol
};
