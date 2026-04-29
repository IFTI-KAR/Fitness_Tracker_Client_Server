import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import personalized_training from '../../assets/personalized_training.jpg';
import Health_tracking from '../../assets/Health_tracking.jpeg';
import comm_support from '../../assets/Community_Support.png';
import progress_insights from '../../assets/Progress_Insights.webp';

const features = [
  {
    image: personalized_training,
    title: 'Personalized Training',
    description: 'Customized workout plans tailored to your goals and fitness level.',
  },
  {
    image: comm_support,
    title: 'Community Support',
    description: 'Join a vibrant community to share, learn, and stay motivated.',
  },
  {
    image: Health_tracking,
    title: 'Health Tracking',
    description: 'Monitor calories, heart rate, and progress with advanced tools.',
  },
  {
    image: progress_insights,
    title: 'Progress Insights',
    description: 'Visualize your improvements through insightful analytics and reports.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Featured = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative py-20 px-4 md:px-10 bg-zinc-950">
      {/* Neo-Athletic Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-6 text-zinc-50 tracking-tight">
          Tools to Power Your <span className="text-lime-400">Journey</span>
        </h2>
        <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto text-lg">
          Discover the high-performance tools designed to push your limits and crush your health goals.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 text-center hover:bg-zinc-900 transition-all duration-300 hover:border-lime-400/50 group"
            >
              <div className="mb-6 flex justify-center">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-24 h-24 object-cover rounded-full border-2 border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-lime-400 transition-colors"
                />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">{feature.title}</h3>
              <p className="text-zinc-400 text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Featured;
