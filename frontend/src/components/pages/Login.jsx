import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Login submitted:', formData)
    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-login">Login</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/PeerTutor/#/signup">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login
