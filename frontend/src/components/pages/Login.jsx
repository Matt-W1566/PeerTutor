import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="login-container">
      <div className='login-wrapper'>
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
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
