import React from 'react'
import './Button.css'
import light from '../../assets/lightbulb.png'
import hat from '../../assets/hat.png'
import { useNavigate } from 'react-router-dom'

const Button = ({ text, icon }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (text === 'Find a Tutor') {
      navigate('/studentForm')
    } else if (text === 'Become a Tutor') {
      navigate('/tutorForm')
    }
  }

  return (
    <button className='btn' onClick={handleClick}>
      {icon === 'lightbulb' && <img src={light} alt='lightbulb' />}
      {icon === 'hat' && <img src={hat} alt='graduation cap' />}
      {text}
    </button>
  )
}

export default Button
