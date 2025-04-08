import React from 'react';
import './Button.css';
import light from '../../assets/lightbulb.png';
import hat from '../../assets/hat.png';

const Button = ({ text, icon }) => {
  return (
    <button className='btn'>
        {icon === 'lightbulb' && <img src={light}></img>}
        {icon === 'hat' && <img src={hat}></img>}
        {text}
    </button>
  );
};

export default Button;
