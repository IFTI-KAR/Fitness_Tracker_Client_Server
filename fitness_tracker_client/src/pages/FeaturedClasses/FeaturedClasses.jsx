import React, { useEffect, useState } from 'react';

const FeaturedClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/featured-classes')
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Failed to load featured classes:', err));
  }, []);

  return (
    <div className="bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-zinc-50 tracking-tight">
          Elite <span className="text-lime-400">Featured Classes</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {classes.map((cls, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-colors group shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={cls.image} alt={cls.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-zinc-100 mb-2">{cls.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{cls.details.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;
