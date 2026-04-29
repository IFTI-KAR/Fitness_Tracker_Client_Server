import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fitness-tracker-server-theta.vercel.app/trainers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Trainer not found');
        return res.json();
      })
      .then((data) => {
        setTrainer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading trainer:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading trainer details...</div>;
  if (!trainer) return <div className="text-center mt-10">Trainer not found</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-16 flex-grow">
        
        {/* Trainer Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-64 h-64 object-cover rounded-2xl border-4 border-zinc-800 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
          />
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tight">{trainer.fullName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Email</p>
                <p className="text-zinc-300 font-medium">{trainer.email}</p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Age</p>
                <p className="text-zinc-300 font-medium">{trainer.age}</p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Available Time</p>
                <p className="text-zinc-300 font-medium">{trainer.availableTime}</p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Skills</p>
                <p className="text-lime-400 font-medium">{trainer.skills?.join(', ') || 'None listed'}</p>
              </div>
              <div className="md:col-span-2 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Available Days</p>
                <p className="text-zinc-300 font-medium">{trainer.availableDays?.join(', ') || 'N/A'}</p>
              </div>
              <div className="md:col-span-2 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Other Info</p>
                <p className="text-zinc-300 font-medium leading-relaxed">{trainer.otherInfo || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

      {/* Available Slots */}
      <div className="mt-12 bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">Available Slots</h3>
        <div className="flex flex-wrap gap-4">
          {trainer.availableDays?.map((day, index) => (
            <button
              key={index}
              onClick={() => navigate(`/book-trainer/${id}?day=${day}`)}
              className="bg-lime-400 text-zinc-950 font-bold px-6 py-3 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:scale-105 transform hover:-translate-y-1"
            >
              {day} ({trainer.availableTime})
            </button>
          ))}
        </div>
      </div>
      {/* Be A Trainer Section */}
      <div className="my-16 text-center bg-zinc-900/50 backdrop-blur-md p-10 rounded-3xl border border-zinc-800">
        <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tight">Become a Trainer</h2>
        <p className="mb-8 text-zinc-400 text-lg">Join us as a fitness trainer and help others transform their lives!</p>
        <button
          onClick={() => navigate('/become-a-trainer')}
          className="bg-zinc-800 text-white border border-zinc-700 px-8 py-3 rounded-xl hover:bg-zinc-700 hover:text-lime-400 transition-all font-bold"
        >
          Apply Now
        </button>
      </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default TrainerDetails;
