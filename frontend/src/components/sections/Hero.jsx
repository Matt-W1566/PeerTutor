import React from 'react'
import './Hero.css'
import heroImage from '../../assets/heroImage.png';
import Button from '../elements/Button';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-text'>
        <div>
            <h1 className='hero-title'>Learn smarter, connect faster</h1>
            <p className='hero-description'>PeerTutor connects students with the right peer tutors from your school, based on skills, schedules, and learning preferences—making learning more effective and accessible, whenever you need it.</p>
        </div>
        <div className='hero-buttons'>
          <Button text="Find a Tutor" icon="lightbulb" />
          <Button text="Become a Tutor" icon="hat" />
        </div>
      </div>
      <img src={heroImage} className='hero-img' />
    </div>
  )
}

export default Hero
