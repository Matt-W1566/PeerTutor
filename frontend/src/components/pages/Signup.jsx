import React, { useState } from 'react'
import './Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    school: '',
    email: '',
    password: '',
    role: '',
    learningstyle: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Signup submitted:', formData)
  }

  return (
    <div className="login-container">
      <div className="signup-wrapper">
        <h1 className="login-title">Sign Up</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="grade">Grade:</label>
          <div className="select-wrapper">
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select your grade</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            placeholder="Enter your school"
            value={formData.school}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role:</label>
          <div className="select-wrapper">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <label htmlFor="learningstyle">{formData.role === 'tutor' ? 'Teaching Style' : 'Learning Style'}:</label>
          <div className="select-wrapper">
            <select
              id="learningstyle"
              name="learningstyle"
              value={formData.learningstyle}
              onChange={handleChange}
              required
            >
              <option value="">Select your style</option>
              <option value="visual">Visual</option>
              <option value="auditory">Auditory</option>
              <option value="handson">Hands-on</option>
              <option value="readwrite">Reading/Writing</option>
            </select>
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p className="login-footer">
          Already have an account? <a href="/PeerTutor/#/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
