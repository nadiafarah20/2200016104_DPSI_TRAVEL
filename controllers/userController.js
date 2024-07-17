// userController.js - Controller

const User = require('../models/user'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

// Controller function for user registration (using POST)
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example of a protected route controller
exports.protectedRoute = (req, res) => {
  res.json({ message: 'You have accessed a protected route!' });
};

// Controller function to get all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
