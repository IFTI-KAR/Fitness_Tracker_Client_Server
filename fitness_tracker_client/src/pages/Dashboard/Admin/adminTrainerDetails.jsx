import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const AdminTrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://fitness-tracker-server-theta.vercel.app/become-a-trainer`)
      .then(res => res.json())
      .then(data => {
        const selected = data.find(t => String(t._id) === id);
        setTrainer(selected);
      })
      .catch(console.error);
  }, [id]);

  const handleConfirm = async () => {
    try {
      await fetch('https://fitness-tracker-server-theta.vercel.app/become-a-trainer/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trainer.email }),
      });
      navigate('/dashboard/applied-trainer');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      await fetch('https://fitness-tracker-server-theta.vercel.app/become-a-trainer/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trainer.email, feedback }),
      });
      navigate('/dashboard/applied-trainer');
    } catch (err) {
      console.error(err);
    }
  };

  if (!trainer) return (
    <div className="flex items-center justify-center min-h-[50vh] space-x-3 text-zinc-400">
      <div className="animate-spin w-8 h-8 border-[3px] border-lime-400 border-t-transparent rounded-full"></div>
      <p className="text-xl">Loading...</p>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-8 md:p-12">
        <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4">Trainer Application Details</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-10">
          {trainer.profileImage && (
            <img
              src={trainer.profileImage}
              alt="Trainer"
              className="w-40 h-40 rounded-2xl object-cover border-4 border-zinc-800 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
            />
          )}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1">Full Name</span>
              <span className="text-lg font-bold text-white">{trainer.fullName || 'N/A'}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1">Email</span>
              <span className="text-lg font-medium text-zinc-300 truncate">{trainer.email || 'N/A'}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1">Phone / Age</span>
              <span className="text-lg font-medium text-zinc-300">{trainer.phone || 'N/A'} / {trainer.age || 'N/A'}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1">Status</span>
              <span className={`text-lg font-bold uppercase tracking-wider ${trainer.status === 'pending' ? 'text-yellow-400' : 'text-lime-400'}`}>{trainer.status || 'pending'}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
            <h3 className="text-sm text-zinc-500 uppercase tracking-wider font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.skills?.length > 0 ? trainer.skills.map((s, idx) => (
                <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm border border-zinc-700">{s}</span>
              )) : <span className="text-zinc-500">N/A</span>}
            </div>
          </div>

          <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
            <h3 className="text-sm text-zinc-500 uppercase tracking-wider font-bold mb-4">Available Days & Time</h3>
            <p className="text-lime-400 font-bold mb-3">{trainer.availableTime || 'N/A'}</p>
            <div className="flex flex-wrap gap-2">
              {trainer.availableDays?.length > 0 ? trainer.availableDays.map((day, idx) => (
                <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm border border-zinc-700">{day}</span>
              )) : <span className="text-zinc-500">N/A</span>}
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 mb-10">
          <h3 className="text-sm text-zinc-500 uppercase tracking-wider font-bold mb-2">Other Info</h3>
          <p className="text-zinc-300 leading-relaxed">{trainer.otherInfo || 'N/A'}</p>
        </div>

        <div className="flex gap-4 pt-6 border-t border-zinc-800">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-lime-400 text-zinc-950 font-bold px-6 py-4 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transform hover:-translate-y-1"
          >
            Confirm Trainer
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-red-500/10 text-red-400 font-bold px-6 py-4 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all transform hover:-translate-y-1"
          >
            Reject Application
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 rounded-3xl w-full max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-white tracking-wide border-b border-zinc-800 pb-4">Reject Trainer</h3>
              <div className="mb-6 space-y-2 text-zinc-300">
                <p><span className="text-zinc-500 uppercase text-xs font-bold mr-2">Name:</span> {trainer.fullName || 'N/A'}</p>
                <p><span className="text-zinc-500 uppercase text-xs font-bold mr-2">Email:</span> {trainer.email || 'N/A'}</p>
              </div>
              <textarea
                placeholder="Provide feedback for rejection..."
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors h-32 mb-6"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
              <div className="flex justify-end gap-4 border-t border-zinc-800 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-all font-bold shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  Submit Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrainerDetails;
