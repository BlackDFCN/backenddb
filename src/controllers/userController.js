const oracledb = require('oracledb');

async function getUserProfile(req, res) {
  const userId = req.user.userId;
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM Usuarios WHERE user_id = :userId`,
      { userId }
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    res.status(200).json({
      user_id: user[0],
      username: user[1],
      email: user[4],
      role_id: user[3],
      created_at: user[5],
      updated_at: user[6]
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
}

async function updateUserProfile(req, res) {
  const userId = req.user.userId;
  const { username, email, role_id } = req.body;
  try {
    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE Usuarios SET username = :username, email = :email, role_id = :role_id, updated_at = CURRENT_TIMESTAMP WHERE user_id = :userId`,
      { username, email, role_id, userId },
      { autoCommit: true }
    );
    await connection.close();
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ message: 'Error updating user profile', error: err.message });
  }
}

module.exports = { getUserProfile, updateUserProfile };
