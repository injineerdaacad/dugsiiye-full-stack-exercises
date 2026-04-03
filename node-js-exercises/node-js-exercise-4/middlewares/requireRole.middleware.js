const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(`Access denied: required one of [${roles.join(", ")}] roles`);
      error.statusCode = 403;
      throw error;
    }

    next();
  };
};

export default requireRole;
