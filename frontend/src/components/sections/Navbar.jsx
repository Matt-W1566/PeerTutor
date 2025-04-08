import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
        <h1 className='nav-title'>PeerTutor</h1>
        <ul className='nav-list'>
            <li><a href='/messages'>Messages</a></li>
            <li><a href='/faq'>FAQ</a></li>
        </ul>
    </div>
  )
}

export default Navbar