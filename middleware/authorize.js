const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as necessary

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Admins only.' });
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Middleware to check if the user is a regular user or an admin
exports.isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'user' && user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Users only.' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
