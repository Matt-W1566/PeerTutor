import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Replace console.log with a fetch call to the login endpoint.
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        // Optionally, store the token in localStorage or context:
        localStorage.setItem('token', data.token)
        console.log('Login successful:', data)
        navigate('/')
        window.location.reload()
      } else {
        console.error('Login error:', data.error)
        setErrorMsg(data.error || 'Login failed.')
      }
    } catch (error) {
      console.error('Network error:', error)
      setErrorMsg('Network error. Please try again later.')
    }
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
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <p className="login-footer">
          Don't have an account? <a href="/PeerTutor/#/signup">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login
