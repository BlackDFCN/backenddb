const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
const logRoutes = require('./src/routes/logRoutes'); 
const reportRoutes = require('./src/routes/reportRoutes'); 
const reservationRoutes = require('./src/routes/reservationRoutes'); 
const tableRoutes = require('./src/routes/tableRoutes'); 
const { initialize, close } = require('./src/config/database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/log', logRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/reservation', reservationRoutes); // Cambio: Corregir la ruta de reservas
app.use('/api/table', tableRoutes); // Cambio: Corregir la ruta de mesas

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
