import React, { useEffect, useState } from 'react';

const TeamSection = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data.slice(0, 3)); // show only first 3 trainers
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load trainers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Team...</div>;
  }

  return (
    <section className="bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-zinc-50 tracking-tight">
          Elite <span className="text-lime-400">Coaches</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 bg-lime-400 blur-xl opacity-20 rounded-full" />
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  className="w-full h-full object-cover rounded-full border-4 border-zinc-800 relative z-10"
                />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">{trainer.fullName}</h3>
              <p className="text-sm text-zinc-400 my-4 leading-relaxed line-clamp-2">
                {trainer.otherInfo || 'Passionate and certified elite fitness trainer ready to push your limits.'}
              </p>
              <div className="inline-block bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-lg">
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                  <span className="text-lime-400">Expertise //</span><br className="sm:hidden" /> {trainer.skills?.join(', ') || 'General Fitness'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
