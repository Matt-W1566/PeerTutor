import React, { useState } from 'react';

// You can either use axios or fetch. Here we’ll use fetch.
// Make sure you have a .env file (at the root of your front-end project) with:
// VITE_API_URL=https://peertutor-production.up.railway.app

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [message, setMessage] = useState('');

  // Using Vite’s environment variables:
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'User created successfully!');
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2em" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Name:<br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Email:<br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Password:<br />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Role:<br />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p style={{ marginTop: "1em" }}>{message}</p>}
    </div>
  );
}

export default Signup;
