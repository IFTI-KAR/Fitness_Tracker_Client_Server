import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

const ActivityLogPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/trainer-application-status')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error('Expected array but got:', data);
          setApplications([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch applications:', err);
        setApplications([]);
      });
  }, []);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'text-yellow-600';
    if (status === 'Rejected') return 'text-red-600';
    if (status === 'Approved') return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-white uppercase tracking-tight">Trainer Application Activity Log</h2>
      <div className="overflow-x-auto bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-xs font-bold border-b border-zinc-800">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {applications.map((app, idx) => (
              <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{app.fullName}</td>
                <td className="px-6 py-4 text-zinc-400">{app.email}</td>
                <td className={`px-6 py-4 font-bold tracking-wide ${getStatusColor(app.status)}`}>
                  {app.status}
                </td>
                <td className="px-6 py-4">
                  {app.status === 'Rejected' && app.feedback ? (
                    <button
                      className="text-blue-400 hover:text-lime-400 transition-colors hover:scale-110 transform"
                      onClick={() => handleViewFeedback(app.feedback)}
                    >
                      <FaEye size={18} />
                    </button>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 rounded-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-wide border-b border-zinc-800 pb-2">Rejection Feedback</h3>
            <p className="mb-6 text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">{selectedFeedback || 'No feedback provided.'}</p>
            <div className="text-right mt-6 pt-4 border-t border-zinc-800">
              <button
                className="bg-zinc-800 text-white px-6 py-2 rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700 font-medium"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogPage;
