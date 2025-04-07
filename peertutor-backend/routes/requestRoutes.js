const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const TutoringRequest = require('../models/TutoringRequest');
const User = require('../models/User');

// Create a new request (student)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // This route can only be used by 'student' role
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can create requests' });
    }

    const { subject, preferredTimes } = req.body;

    const newRequest = await TutoringRequest.create({
      studentId: req.user.userId,
      subject,
      preferredTimes
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all requests (for demonstration; you may want to filter by role or subject)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const requests = await TutoringRequest.find().populate('studentId', 'name email');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a request (tutor)
router.patch('/:requestId/match', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ error: 'Only tutors can accept requests' });
    }

    const { requestId } = req.params;

    // Update the request with the matched tutor ID
    const updatedRequest = await TutoringRequest.findByIdAndUpdate(
      requestId,
      {
        matchedTutorId: req.user.userId,
        status: 'matched'
      },
      { new: true } // return updated doc
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
