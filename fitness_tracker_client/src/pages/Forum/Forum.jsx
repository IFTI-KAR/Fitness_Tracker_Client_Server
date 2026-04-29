import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';

const Forum = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://fitness-tracker-server-theta.vercel.app/forum-posts?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  const handleVote = async (postId, type) => {
    if (!user) return alert('Login required to vote');

    const res = await fetch('https://fitness-tracker-server-theta.vercel.app/forum-vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        email: user.email,
        type
      })
    });

    if (res.ok) {
      // Refresh page to show updated vote counts
      setPage(page);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center uppercase tracking-tight text-white">Community Forum</h2>
      <p className='text-zinc-400 mb-10 text-center'>Notice: You may need to reload the page to see your recent votes.</p>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post._id} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/80 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-sm text-zinc-400 flex items-center gap-2">
                  <span className="flex items-center gap-1"><span className="text-lime-400">👤</span> {post.authorName || 'Anonymous'}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1"><span className="text-lime-400">✉️</span> {post.authorEmail}</span>
                </p>
              </div>

              <div className="text-xs tracking-wider uppercase mt-1">
                {post.role === 'admin' && (
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)]">Admin</span>
                )}
                {post.role === 'trainer' && (
                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]">Trainer</span>
                )}
              </div>
            </div>

            <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50 mb-4">
              <p className="text-zinc-300 leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center gap-6 text-sm mt-4 pt-4 border-t border-zinc-800">
              <button
                onClick={() => handleVote(post._id, 'upvote')}
                className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors font-medium group"
              >
                <span className="group-hover:scale-125 transition-transform">👍</span> 
                <span className={post.upvoteCount > 0 ? "text-lime-400" : ""}>{post.upvoteCount || 0}</span>
              </button>
              <button
                onClick={() => handleVote(post._id, 'downvote')}
                className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors font-medium group"
              >
                <span className="group-hover:scale-125 transition-transform">👎</span> 
                <span className={post.downvoteCount > 0 ? "text-red-400" : ""}>{post.downvoteCount || 0}</span>
              </button>
              <span className="ml-auto text-xs text-zinc-500 font-medium">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-12 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          className="px-6 py-2 bg-zinc-800 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors border border-zinc-700 font-medium"
        >
          Previous
        </button>
        <span className="px-6 py-2 bg-zinc-900/50 backdrop-blur border border-zinc-800 text-lime-400 font-bold rounded-xl flex items-center justify-center min-w-[80px]">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-zinc-800 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors border border-zinc-700 font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Forum;
