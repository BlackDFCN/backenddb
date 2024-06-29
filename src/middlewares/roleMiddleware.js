function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.roleId;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    };
  }
  
  module.exports = authorizeRoles;
  