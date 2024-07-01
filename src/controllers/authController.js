const jwt = require('jsonwebtoken');
const db = require('../config/database');
require('dotenv').config();

const authUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `SELECT user_id, username, password, role_id, email FROM Usuarios WHERE username = :username`,
      { username }
    );

    const user = result.rows[0];
    if (user && password === user.PASSWORD) {
      const token = jwt.sign(
        { id: user.USER_ID, username: user.USERNAME, role_id: user.ROLE_ID },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  authUser
};
