import React from 'react'
import './FAQ.css'

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-item">
        <h2>What is PeerTutor?</h2>
        <p>PeerTutor is a web app that connects students with peer tutors based on subject, availability, and learning preferences. It provides personalized, efficient support from peers who understand your learning style and schedule.</p>
      </div>

      <div className="faq-item">
        <h2>How does matching work?</h2>
        <p>The algorithm matches students with tutors based on availability, subject, and learning style compatibility.</p>
      </div>

      <div className="faq-item">
        <h2>What are the supported learning styles?</h2>
        <ul>
          <li><strong>Visual:</strong> diagrams, slides, videos</li>
          <li><strong>Auditory:</strong> discussions, verbal explanations</li>
          <li><strong>Hands-on:</strong> practice-based learning</li>
          <li><strong>Reading/Writing:</strong> notes, textbooks</li>
        </ul>
      </div>

      <div className="faq-item">
        <h2>How are sessions booked?</h2>
        <p>Once matched, students can book sessions at mutually available times. Tutors receive requests via email. If unresponsive or declining, another tutor is contacted.</p>
      </div>

      <div className="faq-item">
        <h2>What if I want to reject a pairing?</h2>
        <p>Tutors can decline pairings through "System" chats. The system will then match the student with another tutor.</p>
      </div>

      <div className="faq-item">
        <h2>What happens after a tutor accepts?</h2>
        <p>Both users receive confirmation emails and the chat session is unlocked to plan the session.</p>
      </div>

      <div className="faq-item">
        <h2>Are tutors ranked?</h2>
        <p>Yes. There is a leaderboard system for tutor session count.</p>
      </div>

      <div className="faq-item">
        <h2>What technology does PeerTutor use?</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Backend:</strong> Node.js</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>Emails:</strong> Nodemailer</li>
          <li><strong>Messaging:</strong> Socket.io</li>
        </ul>
      </div>
    </div>
  )
}

export default FAQ
