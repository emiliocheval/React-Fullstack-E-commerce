import React from 'react'
import './Hero.css'
import laptopImage from '../Assets/laptop2.jpg'


const Hero = () => {
    return (

        <div className='hero'>
            <h1 className='hero-title'>NEW ARRIVAL</h1>
            <img src={laptopImage} alt="" />
        </div>

    )
}

export default Hero