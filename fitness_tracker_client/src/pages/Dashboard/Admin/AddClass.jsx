import React, { useState } from 'react';

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    details: '',
    
    duration: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('https://fitness-tracker-server-theta.vercel.app/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setMessage('✅ Class added successfully!');
      setFormData({ name: '', image: '', details: '',  duration: '' });
    } else {
      setMessage('❌ ' + result.message);
    }
  };

  return (
    <div className="p-6 min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4 text-center">Add New Class</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Class Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. High-Intensity Interval Training"
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Class Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe what the class is about..."
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 8 weeks"
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-zinc-950 font-bold px-6 py-4 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transform hover:-translate-y-1 mt-4"
          >
            Add Class
          </button>
          
          {message && (
            <div className={`mt-4 p-4 rounded-xl text-sm border text-center font-medium ${message.includes('❌') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-lime-400/10 text-lime-400 border-lime-400/20'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddClass;
