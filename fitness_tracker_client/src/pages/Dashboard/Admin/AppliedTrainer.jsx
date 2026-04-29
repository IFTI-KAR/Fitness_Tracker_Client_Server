import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AppliedTrainer = () => {
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/become-a-trainer')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Applied Trainers:', data); // Inspect this in browser console
        setAppliedTrainers(data);
      })
      .catch(err => {
        console.error('Failed to fetch trainers:', err);
      });
  }, []);

  return (
    <div className="p-6 overflow-x-auto min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4">Applied Trainers</h2>
      <div className="overflow-x-auto bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {appliedTrainers.length > 0 ? (
          <table className="min-w-full text-left">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-xs font-bold border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {appliedTrainers.map((trainer, idx) => {
                const name = trainer.name ?? trainer.fullName ?? trainer.applicant?.name ?? 'N/A';
                const email = trainer.email ?? trainer.applicant?.email ?? 'N/A';

                return (
                  <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-lime-400">{name}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{email}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/dashboard/trainer-details/${trainer._id}`)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-lime-400 border border-zinc-700 font-bold px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-[0_0_10px_rgba(163,230,53,0.1)] text-sm"
                      >
                        Review Application
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-zinc-500 text-center py-12 font-medium">No trainer applications found.</div>
        )}
      </div>
    </div>
  );
};

export default AppliedTrainer;
