const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function registerUser(req, res) {
  const { username, password, email, role_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO Usuarios (username, password, role_id, email)
       VALUES (:username, :password, :role_id, :email)`,
      { username, password: hashedPassword, role_id, email },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM Usuarios WHERE username = :username`,
      { username }
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.USER_ID, roleId: user.ROLE_ID }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token, userId: user.USER_ID, roleId: user.ROLE_ID });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

async function resetPassword(req, res) {
  const { email } = req.body;
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM Usuarios WHERE email = :email`,
      { email }
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const user = result.rows[0];
    const resetToken = jwt.sign({ userId: user.USER_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({ message: 'Error processing request', error: err.message });
  }
}

async function setNewPassword(req, res) {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE Usuarios SET password = :password WHERE user_id = :user_id`,
      { password: hashedPassword, user_id: decoded.userId },
      { autoCommit: true }
    );
    await connection.close();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
}

module.exports = { registerUser, loginUser, resetPassword, setNewPassword };
