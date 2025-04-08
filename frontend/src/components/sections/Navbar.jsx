import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for a token when the Navbar mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout by removing the token and updating state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/PeerTutor/#/login'); // Redirect to login or another page as desired
  };

  return (
    <div className="nav">
      <h1 className="nav-title">
        <Link to="/PeerTutor/">PeerTutor</Link>
      </h1>
      <ul className="nav-list">
        <li className="nav-msg">
          <Link to="/PeerTutor/#/messages">Messages</Link>
        </li>
        <li className="nav-faq">
          <Link to="/PeerTutor/#/faq">FAQ</Link>
        </li>
        <li className="nav-login">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-button">
              Log Out
            </button>
          ) : (
            <Link to="/PeerTutor/#/login" className="nav-button">
              Log In
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
