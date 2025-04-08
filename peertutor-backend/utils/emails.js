// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // 'youremail@gmail.com'
    pass: process.env.EMAIL_PASS  // 'your-app-password'
  }
});

// This function sends an email
async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"PeerTutor" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,    // plain text version
      html     // HTML version (optional)
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (err) {
    console.error(`Error sending email to ${to}:`, err);
  }
}

module.exports = { sendEmail };
