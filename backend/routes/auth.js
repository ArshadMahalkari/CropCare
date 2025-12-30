const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// Helper to check MongoDB connection
const checkMongoConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: 'Database not available. Please ensure MongoDB is running.',
      details: 'MongoDB connection is required for authentication. Start MongoDB service or check MONGO_URI environment variable.'
    });
  }
  next();
};

// POST /api/auth/signup
router.post(
  '/signup',
  [body('email').isEmail(), body('password').isLength({ min: 6 }), body('name').notEmpty(), checkMongoConnection],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user = new User({ name, email, phone, passwordHash });
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
        expiresIn: '7d',
      });

      return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, preferences: user.preferences } });
    } catch (err) {
      console.error('Signup error', err);
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: Object.values(err.errors).map(e => e.message).join(', ') });
      }
      return res.status(500).json({ error: 'Server error: ' + (err.message || 'Unknown error') });
    }
  }
);

// POST /api/auth/login
router.post('/login', [body('email').isEmail(), body('password').exists(), checkMongoConnection], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
      expiresIn: '7d',
    });

    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, preferences: user.preferences } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Server error: ' + (err.message || 'Unknown error') });
  }
});

module.exports = router;
