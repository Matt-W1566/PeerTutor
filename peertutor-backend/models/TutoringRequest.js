const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  preferredTimes: [String], // e.g. ["Tue 4-6pm", "Fri 1-3pm"]
  status: { type: String, default: 'pending' }, 
  matchedTutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // once matched
}, { timestamps: true });

module.exports = mongoose.model('TutoringRequest', requestSchema);
