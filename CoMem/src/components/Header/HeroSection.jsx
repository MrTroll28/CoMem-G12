import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const slides = [
  { id: 1, image: 'https://byvn.net/Qtm9'},
  { id: 2, image: 'https://byvn.net/T8FK'},
  { id: 3, image: 'https://byvn.net/w2T5'}
];

const HeroSection = () => {
  return (
    <div className="relative">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        className="h-96"
      >
        {slides.map(slide => (
            <SwiperSlide key={slide.id}>
                <div
                    className="relative bg-cover bg-center h-96"
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                </div>
            </SwiperSlide>        
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;