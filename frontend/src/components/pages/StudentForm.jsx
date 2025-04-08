import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StudentForm.css'

const StudentForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    subject: ''
  })

  const navigate = useNavigate()
  
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('StudentForm submitted:', formData)
    navigate('/')
  }

  return (
    <div className="login-container">
      <form className="login-wrapper" onSubmit={handleSubmit}>
        <h1 className="login-title">Request a Tutor</h1>

        <div className="login-form">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Subject</label>
          <div className="select-wrapper">
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="biology">Biology</option>
              <option value="chemistry">Chemistry</option>
              <option value="physics">Physics</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="computer">Computer Science</option>
              <option value="business">Business</option>
              <option value="accounting">Accounting</option>
              <option value="economics">Economics</option>
              <option value="history">History</option>
              <option value="geography">Geography</option>
              <option value="civics">Civics and Careers</option>
              <option value="law">Law</option>
              <option value="art">Visual Arts</option>
              <option value="music">Music</option>
              <option value="drama">Drama</option>
              <option value="tech">Technological Studies</option>
              <option value="health">Health & Phys Ed</option>
            </select>
          </div>

          <button type="submit" className="btn btn-login">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm
