import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactFloatButton from '../components/ContactFloatButton'
import BackToTopButton from '../components/BackToTopButton'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto h-[100vh]">
      </div>
      <ContactFloatButton />
      <BackToTopButton />
      <Footer />
    </div>
  )
}

export default Home