const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database');
require('dotenv').config();

const authUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Datos recibidos para autenticar usuario:', { username, password });

  try {
    const query = `SELECT user_id, username, password, role_id, email FROM Usuarios WHERE username = :username`;
    const binds = { username };
    const result = await db.execute(query, binds, { outFormat: db.OUT_FORMAT_OBJECT });

    const user = result.rows[0];
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
      if (isPasswordValid) {
        console.log('Contraseña válida para el usuario:', username);
        const token = jwt.sign(
          { id: user.USER_ID, username: user.USERNAME, role_id: user.ROLE_ID },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        console.log('Contraseña inválida para el usuario:', username);
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } else {
      console.log('Usuario no encontrado:', username);
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error al autenticar usuario:', err);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
};

module.exports = {
  authUser
};
