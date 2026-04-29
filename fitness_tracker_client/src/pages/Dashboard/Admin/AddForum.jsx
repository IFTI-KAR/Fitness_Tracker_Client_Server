import React, { useState, useContext } from 'react';
// Optional: use your auth hook/context to get user
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider'; // adjust path as needed

const AddForum = () => {
  const { user } = useContext(AuthContext); // must provide `displayName` and `email`
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      authorEmail: user?.email,
      authorName: user?.displayName,
      createdAt: new Date(),
    };

    try {
      const res = await fetch('https://fitness-tracker-server-theta.vercel.app/forum-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        setMessage('✅ Post submitted successfully!');
        setTitle('');
        setContent('');
      } else {
        setMessage('❌ Failed to submit post');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ An error occurred while submitting');
    }
  };

  return (
    <div className="p-6 min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-4 text-center">Create a Forum Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Post Title</label>
            <input
              type="text"
              placeholder="e.g. How to stay motivated?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-2 font-medium text-sm uppercase tracking-wider">Post Content</label>
            <textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors h-40"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-400 text-zinc-950 font-bold px-6 py-4 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transform hover:-translate-y-1 mt-4"
          >
            Submit Post
          </button>
          
          {message && (
            <div className={`mt-4 p-4 rounded-xl text-sm border text-center font-medium ${message.includes('❌') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-lime-400/10 text-lime-400 border-lime-400/20'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddForum;
