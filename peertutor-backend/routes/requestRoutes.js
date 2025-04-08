// requestRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const TutoringRequest = require('../models/TutoringRequest');
const User = require('../models/User');
const { sendEmail } = require('../utils/emails');
const { findBestTutor } = require('../utils/matching');

// 1) STUDENT CREATES A REQUEST (auto-match)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Only a student can create a new request
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can create requests' });
    }

    const { subject, preferredTimes } = req.body;
    if (!subject || !preferredTimes?.length) {
      return res.status(400).json({ error: 'Subject and preferredTimes are required.' });
    }

    // 1) Create request
    let newRequest = await TutoringRequest.create({
      studentId: req.user.userId,
      subject,
      preferredTimes,
      status: 'pending'
    });

    // 2) Attempt to auto-match a tutor
    const bestTutor = await findBestTutor(subject, preferredTimes);
    if (bestTutor) {
      newRequest.matchedTutorId = bestTutor._id;
      newRequest.status = 'matched';
      await newRequest.save();

      // OPTIONAL: email the student to say a tutor was found
      // or email the tutor to confirm they've been assigned a new request.
      // For example:
      // const studentEmail = ... fetch from DB if not in JWT
      // await sendEmail({ to: studentEmail, subject: "...", text: "..." });
    }

    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 2) TUTOR ACCEPTS REQUEST MANUALLY (existing code)
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
      // Possibly handle "Student not found" error
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
      // optional: html: `<b>...`
    });

    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
