import React, { useState } from 'react';

const Newsletter = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return setMessage('Please enter your name and email.');
    }

    try {
      const res = await fetch('https://fitness-tracker-server-theta.vercel.app/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Thank you for subscribing!');
        setFormData({ name: '', email: '' });
      } else {
        setMessage(result.message || '❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-zinc-950 py-20 px-4">
      <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-zinc-50 tracking-tight">
            Level Up Your <span className="text-lime-400">Inbox</span>
          </h2>
          <p className="text-zinc-400">Subscribe for elite workouts, nutrition tips, and community news.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-5 py-4 rounded-xl focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-5 py-4 rounded-xl focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-400 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-lime-500 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
          >
            Subscribe Now
          </button>
          
          {message && (
            <p className={`text-center text-sm mt-4 font-medium ${message.includes('❌') ? 'text-rose-400' : 'text-lime-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
