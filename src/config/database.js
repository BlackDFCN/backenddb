require('dotenv').config();
const oracledb = require('oracledb');
const path = require('path');

async function initialize() {
  try {
    // Establecer la variable de entorno TNS_ADMIN
    process.env.TNS_ADMIN = path.resolve('C:\\Users\\Alvaro Bustos\\Desktop\\BaseDeDAtos\\backenddb\\Wallet_UCMDB');

    // Inicializar el cliente Oracle con la ruta correcta
    oracledb.initOracleClient({ libDir: 'C:\\Users\\Alvaro Bustos\\Desktop\\instantclient-basiclite-windows.x64-23.4.0.24.05\\instantclient_23_4' });

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
    await oracledb.getPool().close(0); // Forzar cierre incluso si hay conexiones en uso
    console.log('Database connection pool closed');
  } catch (err) {
    console.error('Error closing database connection pool:', err);
    throw err;
  }
}

async function execute(query, binds = [], options = {}) {
  let connection;
  options.outFormat = oracledb.OUT_FORMAT_OBJECT;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, binds, options);
    if (options.autoCommit) {
      await connection.commit(); // Commit si autoCommit está activado
    }
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = { initialize, close, execute };
