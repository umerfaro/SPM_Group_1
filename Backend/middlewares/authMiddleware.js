const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user; // Attach user info to request
    next();
  });
};

const verifyFarmer = (req, res, next) => {
  if (req.user && req.user.roles.includes('Farmer')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Access is allowed only to Farmers' });
  }
};

module.exports = {
  authenticateToken,
  verifyFarmer,
};
