const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // using bcryptjs
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup route: adapted for both student and tutor registrations
router.post('/signup', async (req, res) => {
  try {
    // Destructure keys from req.body.
    // Notice we expect "availabilities" (for tutor data) from the front end.
    const {
      name,
      email,
      password,
      role,
      grade,
      subjects,       // Array (e.g., ["math", "science"])
      availabilities, // Array of objects (for tutors), e.g., [{ day: "Mon", startTime: "09:00", endTime: "10:00" }]
      learningStyle,
      teachingStyle
    } = req.body;

    // Basic validation for required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Format availability for tutors. Front end sends "availabilities"
    // as an array of objects; convert them to an array of strings.
    let formattedAvailability = [];
    if (role === 'tutor' && availabilities && Array.isArray(availabilities)) {
      formattedAvailability = availabilities.map(avail => {
        // Ensure day, startTime, endTime exist; default to empty strings if not.
        const day = avail.day || '';
        const start = avail.startTime || '';
        const end = avail.endTime || '';
        return `${day} ${start}-${end}`.trim();
      });
    }

    // Create a new user document using the provided data.
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      grade,
      subjects,  // Directly take the array sent from the front end
      availability: formattedAvailability,  // Use our formatted availability for tutors (if any)
      learningStyle,
      teachingStyle
    });

    // Return success
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Login route remains the same
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return the token and user info
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
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
