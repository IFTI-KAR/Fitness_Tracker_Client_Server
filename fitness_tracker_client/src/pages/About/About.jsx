import React from 'react';
import aboutImage from '../../assets/4.webp'; // Replace with your image path

const About = () => {
  return (
    <section className="relative py-20 px-4 md:px-12 bg-zinc-950">
      {/* Subtle Neo-Athletic Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={aboutImage}
            alt="About FitnessPal"
            className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 text-zinc-100">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
            Empowering Your <span className="text-lime-400 font-black italic">Fitness Journey</span>
          </h2>
          <p className="mb-4 text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            <strong className="text-white font-bold">FitnessPal</strong> is your all-in-one companion for transforming your body and mind.
            Personalized programs, real-time tracking, and community motivation—all in one place.
          </p>
          <p className="mb-8 text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            Whether you’re just getting started or striving for peak performance, FitnessPal is with you
            every rep, every step, every beat.
          </p>
          <a
            href="/about"
            className="inline-block px-8 py-4 bg-lime-400 text-zinc-950 rounded-xl font-bold tracking-wide hover:bg-lime-500 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
