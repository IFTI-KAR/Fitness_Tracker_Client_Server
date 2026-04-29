import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const AllTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/trainers')
      .then(res => res.json())
      .then(data => setTrainers(data))
      .catch(console.error);
  }, []);

  if (trainers.length === 0) {
    return <div className="text-center py-10 text-gray-500">No approved trainers yet.</div>;
  }

  return (
    <div>
        <Navbar></Navbar>
        <div className="max-w-7xl mx-auto p-4 py-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center uppercase tracking-tight text-white">Our Top Trainers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trainers.map((trainer, index) => (
        <div key={index} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-2 group flex flex-col">
          <div className="relative overflow-hidden h-72">
             <img
               className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
               src={trainer.profileImage || 'https://via.placeholder.com/300'}
               alt={`${trainer.fullName}'s profile`}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90"></div>
          </div>
          <div className="p-6 flex flex-col flex-grow relative">
            <h2 className="text-2xl font-bold text-white mb-2">{trainer.fullName}</h2>
            <p className="text-zinc-400 mb-1"><span className="text-lime-400 font-medium">Age:</span> {trainer.age || 'N/A'}</p>
            <p className="text-zinc-400 mb-1">
              <span className="text-lime-400 font-medium">Available:</span> {trainer.availableTime || 'N/A'}
            </p>
            <p className="text-zinc-400 mb-4 line-clamp-2">
              <span className="text-lime-400 font-medium">Skills:</span> {trainer.skills?.join(', ') || 'N/A'}
            </p>

            <div className="flex space-x-4 mb-6 mt-auto">
              {trainer.twitter && (
                <a
                  href={trainer.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#1DA1F2] transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {trainer.linkedin && (
                <a
                  href={trainer.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#0A66C2] transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {trainer.instagram && (
                <a
                  href={trainer.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#E4405F] transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>

            <button
              onClick={() => navigate(`/trainers/${trainer._id}`)} // Update to actual trainer details page later
              className="w-full bg-lime-400 hover:bg-lime-500 text-zinc-950 font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] mt-2"
            >
              Know More
            </button>
          </div>
        </div>
      ))}
    </div>
        </div>
    </div>
  );
};

export default AllTrainer;
