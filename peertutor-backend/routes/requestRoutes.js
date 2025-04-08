const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const TutoringRequest = require('../models/TutoringRequest');
const User = require('../models/User');
const { sendEmail } = require('../utils/emails');
const { findBestTutor } = require('../utils/matching');

// STUDENT CREATES A REQUEST (auto-match)
// This endpoint expects a JSON body containing { subject, date, time } for student requests.
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Only a student can create a new tutoring request
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can create requests' });
    }

    const { subject, date, time } = req.body;
    if (!subject || !date || !time) {
      return res.status(400).json({ error: 'Subject, date, and time are required.' });
    }

    // Combine date and time into a single string (adjust formatting as needed)
    const preferredTime = `${date} ${time}`;

    // Create a new tutoring request; preferredTimes is an array of strings.
    let newRequest = await TutoringRequest.create({
      studentId: req.user.userId,
      subject,
      preferredTimes: [preferredTime],
      status: 'pending'
    });

    // Attempt to auto-match a tutor based on subject and preferredTime
    const bestTutor = await findBestTutor(subject, [preferredTime]);
    if (bestTutor) {
      newRequest.matchedTutorId = bestTutor._id;
      newRequest.status = 'matched';
      await newRequest.save();
      
     
      const student = await User.findById(req.user.userId);
      await sendEmail({
        to: student.email,
        subject: `Tutor Matched for ${subject}`,
        text: `We have matched you with tutor ${bestTutor.name}.`
      });
    }

    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Request creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// TUTOR ACCEPTS REQUEST MANUALLY
router.patch('/:requestId/match', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ error: 'Only tutors can accept requests' });
    }

    const { requestId } = req.params;

    const updatedRequest = await TutoringRequest.findByIdAndUpdate(
      requestId,
      {
        matchedTutorId: req.user.userId,
        status: 'matched'
      },
      { new: true }
    ).populate('studentId');

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const student = await User.findById(updatedRequest.studentId);
    // Build and send an email
    const subjectText = `Tutor Accepted Your ${updatedRequest.subject} Request!`;
    const emailText = `Hi ${student.name}, your request for ${updatedRequest.subject} has been accepted by a tutor! Please log in to confirm session details.`;

    await sendEmail({
      to: student.email,
      subject: subjectText,
      text: emailText
    });

    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error("Tutor match error:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
