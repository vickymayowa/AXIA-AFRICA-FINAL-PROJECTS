const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// User registration
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
