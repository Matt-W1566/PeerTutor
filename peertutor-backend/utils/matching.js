// utils/matching.js

const User = require('../models/User');

/**
 * Attempts to find the "best tutor" who can teach `subject`
 * and has at least one overlapping availability in `studentTimes`.
 * 
 * Right now, it just picks the first tutor that meets the criteria.
 * You can expand it to sort by rating or fewer assigned requests, etc.
 *
 * @param {String} subject - e.g. "Math"
 * @param {String[]} studentTimes - e.g. ["Mon 3-5pm","Wed 5-7pm"]
 * @returns {User|null} a tutor document, or null if none found
 */
async function findBestTutor(subject, studentTimes) {
  // 1) Find tutors that can teach the subject
  const tutors = await User.find({
    role: 'tutor',
    subjects: subject
  });

  if (!tutors.length) return null;

  // 2) Filter by overlapping availability:
  // For simplicity, if the tutor has at least one matching time slot with the student, we call that a match.
  // Example: tutor.availability = ["Mon 3-5pm","Fri 2-4pm"]
  const matchedTutors = tutors.filter((tutor) => {
    // If either side is empty, we skip. Otherwise, look for overlap
    if (!tutor.availability || !tutor.availability.length) return false;

    // Check if any time slot intersects
    return tutor.availability.some((slot) => studentTimes.includes(slot));
  });

  if (!matchedTutors.length) {
    // No tutors had overlapping times
    return null;
  }

  // 3) Return the FIRST matched tutor (for now).
  // You could sort matchedTutors by average rating or fewer assigned requests, etc.
  return matchedTutors[0];
}

module.exports = { findBestTutor };
