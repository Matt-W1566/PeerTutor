import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for a token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  // Logout handler: remove token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className='nav'>
      <h1 className='nav-title'><a href='/PeerTutor/'>PeerTutor</a></h1>
      <ul className='nav-list'>
        <li className='nav-msg'><a href='/PeerTutor/#/messages'>Messages</a></li>
        <li className='nav-faq'><a href='/PeerTutor/#/faq'>FAQ</a></li>
        <li className='nav-login'>
          {loggedIn ? (
            <a onClick={handleLogout} className='nav-login'>Logout</a>
          ) : (
            <a href='/PeerTutor/#/login'>Login</a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
