import React, { useEffect, useState } from 'react';

const AllNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/newsletter')
      .then(res => res.json())
      .then(data => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch subscribers:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 overflow-x-auto min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4">All Newsletter Subscribers</h2>

      {loading ? (
        <div className="flex items-center space-x-3 text-zinc-400">
          <div className="animate-spin w-6 h-6 border-[3px] border-lime-400 border-t-transparent rounded-full"></div>
          <p>Loading subscribers...</p>
        </div>
      ) : subscribers.length === 0 ? (
        <p className="text-zinc-500 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">No subscribers found.</p>
      ) : (
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-xs font-bold border-b border-zinc-800">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{index + 1}</td>
                  <td className="py-4 px-6 font-bold text-lime-400">{subscriber.name}</td>
                  <td className="py-4 px-6">{subscriber.email}</td>
                  <td className="py-4 px-6 text-zinc-400">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
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

export default AllNewsletter;
