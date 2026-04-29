import React, { useEffect, useState } from 'react';

const AdminAllTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = () => {
    fetch('https://fitness-tracker-server-theta.vercel.app/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch trainers:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDeleteTrainer = async (email) => {
    const confirm = window.confirm('Are you sure you want to remove this trainer?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://fitness-tracker-server-theta.vercel.app/remove-trainer`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.modified && result.deleted) {
        alert('Trainer removed successfully.');
        fetchTrainers(); // Refresh
      } else {
        alert('Failed to remove trainer.');
      }
    } catch (err) {
      console.error('Error removing trainer:', err);
      alert('Server error.');
    }
  };

  return (
    <div className="p-6 overflow-x-auto min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4">All Approved Trainers</h2>

      {loading ? (
        <div className="flex items-center space-x-3 text-zinc-400">
          <div className="animate-spin w-6 h-6 border-[3px] border-lime-400 border-t-transparent rounded-full"></div>
          <p>Loading trainers...</p>
        </div>
      ) : trainers.length === 0 ? (
        <p className="text-zinc-500 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">No trainers found.</p>
      ) : (
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-xs font-bold border-b border-zinc-800">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Skills</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {trainers.map((trainer, index) => (
                <tr key={trainer._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{index + 1}</td>
                  <td className="py-4 px-6 font-bold text-lime-400">{trainer.fullName}</td>
                  <td className="py-4 px-6">{trainer.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {trainer.skills?.map(skill => (
                        <span key={skill} className="bg-zinc-800 px-2 py-1 rounded text-xs border border-zinc-700">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDeleteTrainer(trainer.email)}
                      className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] font-bold text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllTrainer;
