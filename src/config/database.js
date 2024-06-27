const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

async function initialize() {
  await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
  });
}

async function close() {
  await oracledb.getPool().close();
}

module.exports = { initialize, close };
