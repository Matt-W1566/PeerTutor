// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // Using bcryptjs to avoid native binary issues
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup route – expects full user data (name, email, password, role, grade, subjects, availability, learningStyle, teachingStyle)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, grade, subjects, availability, learningStyle, teachingStyle } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      grade,
      subjects,
      availability,
      learningStyle,
      teachingStyle
    });

    // Return success message
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route – expects email and password; returns JWT on success
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return token and user info
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
