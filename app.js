const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes'); // Asegúrate de ajustar la ruta
const { initialize, close } = require('./src/config/database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto por el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize the database', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  close().catch(err => {
    console.error('Failed to close database connection pool', err);
  });
});

module.exports = app;


