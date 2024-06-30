require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initialize() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, process.env.DB_SSL_CA)).toString(),
    },
  });

  try {
    await pool.connect();
    console.log('Database connection established');
  } catch (err) {
    console.error('Error creating database connection pool:', err);
    throw err;
  }

  return pool;
}

async function close(pool) {
  try {
    await pool.end();
    console.log('Database connection pool closed');
  } catch (err) {
    console.error('Error closing database connection pool:', err);
    throw err;
  }
}

module.exports = { initialize, close };
