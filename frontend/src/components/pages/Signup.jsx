import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div className="login-container">
      <h1 className="login-title">Sign Up</h1>
      <form className="login-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />

        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          id="grade"
          name="grade"
          placeholder="Enter your grade"
          required
        />

        <label htmlFor="school">School:</label>
        <input
          type="text"
          id="school"
          name="school"
          placeholder="Enter your school"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a password"
          required
        />

        <label htmlFor="role">Role:</label>
        <div className="select-wrapper">
            <select id="role" name="role" required>
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
            </select>
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p className="login-footer">
        Already have an account? <a href="/PeerTutor/#/login">Login</a>
      </p>
    </div>
  )
}

export default Signup
