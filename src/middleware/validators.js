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
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('phone_number').notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateEmployee = [
  body('user_id').isNumeric().withMessage('User ID must be a number'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('hire_date').isDate().withMessage('Hire date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateTable = [
  body('table_number').isNumeric().withMessage('Table number must be a number'),
  body('capacity').isNumeric().withMessage('Capacity must be a number'),
  body('status').isIn(['disponible', 'reservada', 'mantenimiento']).withMessage('Invalid status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateReservation = [
  body('customer_id').isNumeric().withMessage('Customer ID must be a number'),
  body('table_id').isNumeric().withMessage('Table ID must be a number'),
  body('reservation_time').isISO8601().withMessage('Reservation time must be a valid date-time'),
  body('status').isIn(['pendiente', 'confirmada', 'cancelada']).withMessage('Invalid status'),
  body('email').isEmail().withMessage('Invalid email format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUser,
  validateCustomer,
  validateEmployee,
  validateTable,
  validateReservation
};
