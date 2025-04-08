// requestRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const TutoringRequest = require('../models/TutoringRequest');
const User = require('../models/User');
const { sendEmail } = require('../utils/email'); // <--- new import

// Accept a request (tutor)
router.patch('/:requestId/match', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ error: 'Only tutors can accept requests' });
    }

    const { requestId } = req.params;

    // 1) Update the request
    const updatedRequest = await TutoringRequest.findByIdAndUpdate(
      requestId,
      {
        matchedTutorId: req.user.userId,
        status: 'matched'
      },
      { new: true }
    ).populate('studentId'); // so we can get student's email

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // 2) Get the student's info
    const student = await User.findById(updatedRequest.studentId);
    if (!student) {
      // Possibly handle error: "Student not found"
    }

    // 3) Build the email
    const subject = `Tutor Accepted Your ${updatedRequest.subject} Request!`;
    const text = `Hi ${student.name}, your request for ${updatedRequest.subject} was accepted by a tutor! 
                  Please log in to confirm session details.`;

    // 4) Send the email
    await sendEmail({
      to: student.email,
      subject,
      text
      // optional: html: `<b>...</b>`
    });

    // 5) Return the updated request in response
    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
