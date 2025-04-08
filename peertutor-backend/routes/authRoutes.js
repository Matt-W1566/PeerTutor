const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // using bcryptjs to avoid native binary issues
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Route – for both students and tutors (fields sent by front end)
router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      grade,
      subjects,
      availability, // For student requests; or tutor availability if needed
      learningStyle,
      teachingStyle,
      availabilities // For tutor registration as an array of objects (optional)
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If registering as a tutor and availabilities are provided,
    // transform the availabilities array (if applicable)
    let formattedAvailability = availability || [];
    if (role === 'tutor' && availabilities && Array.isArray(availabilities)) {
      // Convert each availability object {day, startTime, endTime} to a string format.
      formattedAvailability = availabilities.map(avail => {
        const day = avail.day || '';
        const start = avail.startTime || '';
        const end = avail.endTime || '';
        return `${day} ${start}-${end}`.trim();
      });
    }

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      grade,
      subjects,           // This should be an array of subjects
      availability: formattedAvailability,
      learningStyle,
      teachingStyle
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Login Route – returns a JWT token and sets it as an HTTP-only cookie
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
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Return a success response along with minimal user info
    res.status(200).json({
      message: 'Logged in successfully',
      token, // you can also return the token in the JSON
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
