const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

async function testConnection() {
  try {
    const connectionParams = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    };

    console.log('Connection parameters:', connectionParams);

    const connection = await oracledb.getConnection(connectionParams);
    console.log('Connection was successful!');
    await connection.close();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
