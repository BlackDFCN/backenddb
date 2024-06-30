const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const userRoutes = require('./src/routes/userRoutes');
const { initialize } = require('./src/config/database');
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

initialize().then(pool => {
  app.locals.pool = pool; // Guarda el pool de conexiones en la variable locals de Express
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize the database', err);
  process.exit(1);
});

module.exports = app;

