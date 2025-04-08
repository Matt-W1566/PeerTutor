import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
        <h1 className='nav-title'><a href='/'>PeerTutor</a></h1>
        <ul className='nav-list'>
            <li className='nav-msg'><a href='/messages'>Messages</a></li>
            <li className='nav-faq'><a href='/faq'>FAQ</a></li>
            <li className='nav-login'><a href='/login'>Login</a></li>
        </ul>
    </div>
  )
}

export default Navbar