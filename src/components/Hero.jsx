import React from 'react'
import HeroImage from '../assets/hero.png'

const Hero = ({ message }) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative"
    >
      <img
        className="w-full"
        src={HeroImage}
        alt=""
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

      <div className="absolute inset-0 flex items-center justify-center flex-col px-4">
        <h1
          id="hero-title"
          className="text-3xl md:text-5xl font-bold text-white text-center leading-tight max-w-3xl"
        >
          { message }
        </h1>
      </div>
    </section>
  )
}

export default Hero