import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const slides = [
  { id: 1, image: '/banner1.png'},
  { id: 2, image: '/banner2.png'},
  { id: 3, image: '/banner3.png'}
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
        className="h-150"
      >
        {slides.map(slide => (
            <SwiperSlide key={slide.id}>
                <div
                    className="relative bg-cover bg-center h-150"
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