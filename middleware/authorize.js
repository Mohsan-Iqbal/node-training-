const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'admin') or an array of roles
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: Insufficient rights" });
    }
    next();
  };
};

module.exports = authorize;
