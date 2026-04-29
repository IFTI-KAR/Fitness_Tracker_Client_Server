import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const openModal = () => {
    setDisplayName(user?.displayName || '');
    setPhotoURL(user?.photoURL || '');
    setError('');
    setSuccessMsg('');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (!displayName.trim()) {
      setError('Name cannot be empty');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://fitness-tracker-server-theta.vercel.app/users/${encodeURIComponent(user.email.toLowerCase())}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, photoURL }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to update profile');

      setSuccessMsg('Profile updated successfully!');
      setLoading(false);

      setTimeout(() => {
        setIsModalOpen(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden md:flex">
        <div className="bg-zinc-950 p-8 flex flex-col items-center justify-center md:w-1/3 border-r border-zinc-800">
          <div className="relative group">
            <img
              src={user?.photoURL || 'https://i.ibb.co/2kRmn3Q/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 shadow-[0_0_15px_rgba(163,230,53,0.2)] group-hover:border-lime-400 transition-colors duration-300"
            />
          </div>
          <h3 className="text-white mt-6 text-2xl font-bold tracking-wide">{user?.displayName || 'No Name'}</h3>
          <span className="mt-2 bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-lime-400/30">Member</span>
        </div>

        <div className="p-8 md:w-2/3 bg-transparent">
          <h2 className="text-3xl font-extrabold text-white mb-6 uppercase tracking-tight">Account Information</h2>
          <div className="space-y-6">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Full Name</p>
              <p className="text-lg text-zinc-300 font-medium">{user?.displayName || 'Not set'}</p>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Email Address</p>
              <p className="text-lg text-zinc-300 font-medium">{user?.email}</p>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Last Login</p>
              <p className="text-lg text-zinc-300 font-medium">{user?.metadata?.lastSignInTime || 'Unavailable'}</p>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={openModal}
              className="bg-lime-400 text-zinc-950 font-bold px-6 py-3 rounded-xl hover:bg-lime-300 transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transform hover:-translate-y-1"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md relative shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 text-white tracking-wide">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-zinc-400 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-2 font-medium">Profile Picture URL</label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-zinc-500 mb-2 font-medium">Email (not editable)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-600 rounded-xl px-4 py-3 cursor-not-allowed"
                />
              </div>
              {error && <p className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">{error}</p>}
              {successMsg && <p className="text-lime-400 bg-lime-400/10 p-3 rounded-lg text-sm border border-lime-400/20">{successMsg}</p>}
              <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-lime-400 text-zinc-950 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] font-bold"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
