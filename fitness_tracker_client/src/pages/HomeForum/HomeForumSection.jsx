import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const HomeForumSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/forum-posts?page=1') // Get first 6 posts
      .then(res => res.json())
      .then(data => {
        const latestPosts = data.posts.slice(0, 6); // Limit to 6 if needed
        setPosts(latestPosts);
      });
  }, []);

  return (
    <div className="bg-zinc-950 py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-zinc-50 tracking-tight">
          Community <span className="text-lime-400">Insights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-lime-400/30 transition-colors">
              <div className="flex justify-between items-start mb-4 gap-4">
                <h3 className="text-xl font-bold text-zinc-100 leading-tight">{post.title}</h3>
                {post.role === 'admin' && (
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shrink-0">Admin</span>
                )}
                {post.role === 'trainer' && (
                  <span className="bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shrink-0">Trainer</span>
                )}
              </div>
              <p className="text-base text-zinc-400 mb-4 leading-relaxed">
                {post.content.slice(0, 120)}{post.content.length > 120 && '...'}
              </p>
              <div className="text-sm text-zinc-500 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                  {(post.authorName || 'U')[0].toUpperCase()}
                </div>
                <span><span className="font-medium text-zinc-300">{post.authorName || 'Unknown'}</span></span>
              </div>
              <Link
                to={`/forum/post/${post._id}`}
                className="inline-block text-lime-400 hover:text-lime-300 transition-colors text-sm font-bold tracking-wide uppercase"
              >
                Read More <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/forum-page"
            className="inline-block px-8 py-3 bg-zinc-800 text-zinc-100 rounded-xl font-bold hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
          >
            Explore All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeForumSection;
