const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true }, // Will store hashed password
  role:         { type: String, enum: ['student', 'tutor'], required: true },
  grade:        Number,
  subjects:     [String],
  availability: [String],  // e.g. ["Mon 3-5pm", "Wed 5-7pm"]
  learningStyle:  String,   // student-only, e.g. "visual"
  teachingStyle:  String,   // tutor-only, e.g. "hands-on"
});

module.exports = mongoose.model('User', userSchema);
