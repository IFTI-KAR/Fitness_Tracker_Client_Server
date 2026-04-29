import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#a3e635', '#3b82f6']; // lime-400 and blue-500

const Balance = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/admin/balance')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch balance data');
        return res.json();
      })
      .then(data => {
        setBalanceData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load balance data');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh] space-x-3 text-zinc-400">
      <div className="animate-spin w-8 h-8 border-[3px] border-lime-400 border-t-transparent rounded-full"></div>
      <p className="text-xl">Loading...</p>
    </div>
  );
  if (error) return <p className="text-center mt-10 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl">{error}</p>;

  const {
    totalBalance = 0,
    recentPayments = [],
    totalSubscribers = 0,
    totalPaidMembers = 0
  } = balanceData || {};

  const chartData = [
    { name: 'Newsletter Subscribers', value: Number(totalSubscribers) || 0 },
    { name: 'Paid Members', value: Number(totalPaidMembers) || 0 },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen text-white">
      <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4">💰 Admin Balance Overview</h2>

      {/* Total Balance */}
      <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex items-center justify-between">
        <p className="text-2xl font-bold uppercase tracking-wider text-zinc-300">Total Remaining Balance</p>
        <span className="text-5xl font-extrabold text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
          ${Number(totalBalance).toFixed(2)}
        </span>
      </div>

      {/* Last 6 Transactions */}
      <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">🧾 Last 6 Transactions</h3>
        {recentPayments.length === 0 ? (
          <p className="text-zinc-500">No recent transactions.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPayments.map(txn => (
              <li key={txn.transactionId || txn._id} className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl hover:border-lime-400/30 transition-colors">
                <p className="text-lg mb-2">
                  <span className="font-bold text-lime-400">{txn.userName}</span> booked{' '}
                  <span className="font-bold text-white">{txn.trainerName}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
                  <p>Package: <span className="text-white">{txn.package}</span></p>
                  <p>Slot: <span className="text-white">{txn.slot}</span></p>
                  <p>Price: <span className="text-lime-400 font-bold">${txn.price}</span></p>
                  <p>Date: <span className="text-white">
                    {txn.paidAt ? new Date(txn.paidAt).toLocaleDateString() : 'N/A'}
                  </span></p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">📊 Subscribers vs Paid Members</h3>
        {chartData.every(item => item.value === 0) ? (
          <p className="text-zinc-500">No data available to display the chart.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={70}
                label={{ fill: '#fff', fontSize: 14 }}
                dataKey="value"
                stroke="rgba(24,24,27,0.5)"
                strokeWidth={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '1rem', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Balance;
