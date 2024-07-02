const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateCustomer = [
  // Validar y sanitizar el nombre
  body('first_name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  
  // Validar y sanitizar el apellido
  body('last_name')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  // Validar y sanitizar el número de teléfono
  body('phone_number')
    .notEmpty().withMessage('El número de teléfono es obligatorio')
    .isMobilePhone().withMessage('Debe ser un número de teléfono válido'),

  // Validar y sanitizar el correo electrónico
  body('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Debe ser un correo electrónico válido'),

  // Manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEmployee = [
  // Validar y sanitizar el nombre
  body('first_name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  
  // Validar y sanitizar el apellido
  body('last_name')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  // Validar y sanitizar el puesto
  body('position')
    .notEmpty().withMessage('El puesto es obligatorio'),

  // Validar y sanitizar la fecha de contratación
  body('hire_date')
    .notEmpty().withMessage('La fecha de contratación es obligatoria')
    .isDate().withMessage('Debe ser una fecha válida'),

  // Manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTable = [
  // Validar y sanitizar el número de mesa
  body('table_number')
    .notEmpty().withMessage('El número de mesa es obligatorio')
    .isInt({ min: 1 }).withMessage('El número de mesa debe ser un número entero positivo'),
  
  // Validar y sanitizar la capacidad
  body('capacity')
    .notEmpty().withMessage('La capacidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero positivo'),

  // Validar y sanitizar el estado
  body('status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['disponible', 'reservada', 'mantenimiento']).withMessage('Estado inválido'),

  // Manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateReservation = [
  // Validar y sanitizar el ID del cliente
  body('customer_id')
    .notEmpty().withMessage('El ID del cliente es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del cliente debe ser un número entero positivo'),
  
  // Validar y sanitizar el ID de la mesa
  body('table_id')
    .notEmpty().withMessage('El ID de la mesa es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID de la mesa debe ser un número entero positivo'),

  // Validar y sanitizar la hora de la reserva
  body('reservation_time')
    .notEmpty().withMessage('La hora de la reserva es obligatoria')
    .isISO8601().withMessage('La hora de la reserva debe ser una fecha y hora válida'),

  // Validar y sanitizar el estado
  body('status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['pendiente', 'confirmada', 'cancelada']).withMessage('Estado inválido'),

  // Validar y sanitizar el email
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Formato de email inválido'),

  // Manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateReport = (type) => {
  switch(type) {
    case 'diario':
      return [
        body('report_date')
          .notEmpty().withMessage('La fecha del reporte es obligatoria')
          .isISO8601().withMessage('La fecha del reporte debe ser una fecha válida'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array());
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        }
      ];
    case 'semanal':
      return [
        body('start_date')
          .notEmpty().withMessage('La fecha de inicio es obligatoria')
          .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
        body('end_date')
          .notEmpty().withMessage('La fecha de fin es obligatoria')
          .isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array());
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        }
      ];
    case 'mensual':
      return [
        body('report_month')
          .notEmpty().withMessage('El mes del reporte es obligatorio')
          .matches(/^\d{4}-(0[1-9]|1[0-2])$/).withMessage('El mes del reporte debe estar en formato YYYY-MM'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array());
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        }
      ];
    default:
      return (req, res, next) => next();
  }
};

module.exports = {
  validateUser,
  validateCustomer,
  validateEmployee,
  validateTable,
  validateReservation,
  validateReport
};
