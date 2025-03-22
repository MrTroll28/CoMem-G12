import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactFloatButton from '../components/ContactFloatButton';
import BackToTopButton from '../components/BackToTopButton';
import HeroSection from '../components/Header/HeroSection';
import ProductList from '../components/Header/ProductList';
import FeatureSection from '../components/Header/FeatureSection';

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="container mx-auto py-10">
        <ProductList url="/best-selling" image="/pli1.png"/>
        <ProductList url="/new" image="/pli2.png"/>
        <ProductList url="/clothing" image="pli3.png"/>
        <ProductList url="/accessories" image="pli4.png"/>
        <FeatureSection />
      </div>  
      <ContactFloatButton />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Home;