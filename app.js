const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/config/database');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Inicializar la conexión a la base de datos
db.initialize();

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const tableRoutes = require('./src/routes/tableRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const roleRoutes = require('./src/routes/roleRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reports', reportRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', () => {
  db.close().then(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
