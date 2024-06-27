const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

async function initialize() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    console.log('Database connection established');
  } catch (err) {
    console.error('Error creating database connection pool:', err);
    throw err;
  }
}

async function close() {
  try {
    await oracledb.getPool().close();
    console.log('Database connection pool closed');
  } catch (err) {
    console.error('Error closing database connection pool:', err);
    throw err;
  }
}

module.exports = { initialize, close };
