import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import bg_image0 from '../../assets/0.jpg';
import bg_image1 from '../../assets/1.jpg';
import bg_image2 from '../../assets/2.jpg';
import bg_image3 from '../../assets/3.jpg';

const slides = [
  {
    image: bg_image0,
    title: "Fuel Your Fitness Journey",
    description: "Discover expert-led workouts and personalized training plans.",
    button: "Explore Classes",
  },
  {
    image: bg_image1,
    title: "Train Like a Pro",
    description: "Join classes guided by top fitness instructors.",
    button: "Join Now",
  },
  {
    image: bg_image2,
    title: "Stay Motivated",
    description: "Track your progress and stay inspired daily.",
    button: "Track Progress",
  },
  {
    image: bg_image3,
    title: "Achieve Your Goals",
    description: "Your transformation starts today. Let’s do this together.",
    button: "Get Started",
  },
];

const Banner = () => {
  return (
    <div className="w-full relative bg-zinc-950">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-b-2xl shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-[80vh] sm:h-[85vh] md:h-[90vh] flex items-center justify-center text-zinc-100 relative overflow-hidden bg-zinc-950">
              
              {/* Deep Cinematic Image Layer */}
              <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40 z-0 grayscale-[20%]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80 z-0" />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-zinc-900/60 backdrop-blur-md p-6 md:p-12 rounded-2xl text-center max-w-[90%] sm:max-w-xl md:max-w-3xl mx-auto relative z-10 border border-zinc-800 shadow-2xl"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 font-sans tracking-tight text-white uppercase"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mb-8 text-base sm:text-lg md:text-xl font-sans text-zinc-300 max-w-xl mx-auto"
                >
                  {slide.description}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  onClick={() => (window.location.href = '/classes')}
                  className="bg-lime-400 hover:bg-lime-500 transition-colors px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl text-zinc-950 font-bold shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
                >
                  {slide.button}
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
