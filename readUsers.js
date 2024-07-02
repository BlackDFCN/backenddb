const db = require('./src/config/database');

async function leerUsuarios() {
  try {
    await db.initialize();

    const query = `SELECT user_id, username, role_id, email, created_at, updated_at FROM Usuarios`;
    const result = await db.execute(query, {}, { outFormat: db.OUT_FORMAT_OBJECT });

    console.log('Usuarios:');
    console.log(result.rows);

    await db.close();
  } catch (err) {
    console.error('Error reading users:', err);
  }
}

leerUsuarios();
