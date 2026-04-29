import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const SingleForumPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://fitness-tracker-server-theta.vercel.app/forum-post/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-600 text-sm mb-2">
        Posted by <span className="font-semibold">{post.authorName}</span> ({post.role})
      </p>
      <p className="text-sm text-gray-500 mb-6">{new Date(post.createdAt).toLocaleString()}</p>
      <div className="text-lg text-gray-800 leading-relaxed">
        {post.content}
      </div>
      <div className="mt-6 text-sm text-gray-600">
        👍 Upvotes: {post.upvoteCount} | 👎 Downvotes: {post.downvoteCount}
      </div>
    </div>
  );
};

export default SingleForumPage;
