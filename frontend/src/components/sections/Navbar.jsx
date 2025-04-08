import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in by verifying if a token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  // When logging out, remove token and update state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className='nav'>
      <h1 className='nav-title'>
        <Link to="/PeerTutor/">PeerTutor</Link>
      </h1>
      <ul className='nav-list'>
        <li className='nav-msg'>
          <Link to="/PeerTutor/#/messages">Messages</Link>
        </li>
        <li className='nav-faq'>
          <Link to="/PeerTutor/#/faq">FAQ</Link>
        </li>
        <li className='nav-login'>
          {loggedIn ? (
            // If logged in, show Logout button
            <button onClick={handleLogout} className="nav-button">Logout</button>
          ) : (
            // Otherwise, show Login link
            <Link to="/PeerTutor/#/login" className="nav-button">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
