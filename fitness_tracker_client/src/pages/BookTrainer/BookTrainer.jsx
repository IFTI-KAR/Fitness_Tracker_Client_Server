import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const BookTrainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const slot = new URLSearchParams(location.search).get('day');

  useEffect(() => {
    fetch(`https://fitness-tracker-server-theta.vercel.app/trainers/${id}`)
      .then(res => res.json())
      .then(data => setTrainer(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleJoinNow = () => {
    if (!selectedPackage) {
      alert('Please select a membership package first.');
      return;
    }
    // Navigate to payment with trainer id, slot and package as query params
    navigate(`/payment?trainerId=${id}&slot=${slot}&package=${selectedPackage}`);
  };

  if (!trainer) return <div className="text-center mt-10">Loading trainer info...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-16 flex-grow w-full">
        <div className="bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center uppercase tracking-tight text-white border-b border-zinc-800 pb-6">Trainer Booking Confirmation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Trainer Name</p>
              <p className="text-xl font-bold text-white">{trainer.fullName}</p>
            </div>
            <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Selected Slot</p>
              <p className="text-xl font-bold text-lime-400">{slot}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Trainer's Classes:</h3>
            <div className="flex flex-wrap gap-3">
              {trainer.skills?.map((skill, index) => (
                <span key={index} className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-sm font-medium border border-zinc-700">
                  {skill}
                </span>
              )) || <span className="text-zinc-500">No classes listed</span>}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-white text-center">Choose a Membership Package:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Basic',
                  price: 10,
                  features: [
                    'Access to gym facilities during regular operating hours',
                    'Use of cardio and strength training equipment',
                  ],
                },
                {
                  name: 'Standard',
                  price: 50,
                  features: [
                    'All benefits of the basic membership',
                    'Access to group fitness classes (yoga, spinning, Zumba)',
                    'Access to locker rooms and showers',
                  ],
                },
                {
                  name: 'Premium',
                  price: 100,
                  features: [
                    'All benefits of the standard membership',
                    'Personal training sessions with certified trainers',
                    'Use of sauna or steam room',
                    'Discounts on massage/nutrition services',
                  ],
                },
              ].map(pkg => (
                <div
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`border-2 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                    selectedPackage === pkg.name 
                      ? 'border-lime-400 bg-lime-400/10 shadow-[0_0_20px_rgba(163,230,53,0.15)] transform -translate-y-2' 
                      : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-600 hover:-translate-y-1'
                  }`}
                >
                  {selectedPackage === pkg.name && (
                    <div className="absolute -top-3 -right-3 bg-lime-400 text-zinc-950 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                      ✓
                    </div>
                  )}
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-3xl font-extrabold text-lime-400 mb-6">${pkg.price}<span className="text-sm text-zinc-500 font-medium tracking-normal">/session</span></p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-zinc-400">
                        <span className="text-lime-400 mr-2 mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-zinc-800">
            <button
              onClick={handleJoinNow}
              className="bg-lime-400 text-zinc-950 px-12 py-4 rounded-xl hover:bg-lime-300 transition-all font-bold text-lg shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transform hover:scale-105"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookTrainer;
