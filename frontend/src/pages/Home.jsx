import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import Faq from '../components/Faq'

const Home = () => {
  return (
    <div >
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <TestimonialsCarousel/>
      <Faq/>
      <OurPolicy/>
     
    </div>
  )
}

export default Home
