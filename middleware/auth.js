const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.authorizeUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access Denied. Insufficient permissions.' });
  }
  next();
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Insufficient permissions.' });
  }
  next();
};
