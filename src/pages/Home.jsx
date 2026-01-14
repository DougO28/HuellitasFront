import React from 'react'
import Hero from '../components/Hero'
import { AboutUs } from '../components/AboutUs'
import ProcesoAdopcion from '../components/ProcesoAdopcion'
import HomeDogsSlider from '../components/HomeDogsSlider'
import TestimonialsSlider from '../components/TestimonialsSlider'
import Ubicanos from '../components/Ubicanos'

const Home = () => {
  return (
    <div>
      <Hero message="¡Encuentra a tu mejor amigo hoy!"/>
      <AboutUs />
      <ProcesoAdopcion />
      <HomeDogsSlider />
      <Ubicanos />
      <TestimonialsSlider />
    </div>
  )
}

export default Home