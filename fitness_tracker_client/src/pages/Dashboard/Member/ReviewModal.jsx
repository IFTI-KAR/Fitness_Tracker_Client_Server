import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewModal = ({ onClose, onSubmit, trainerName }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmit({ rating, feedback });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Review {trainerName}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2 font-medium">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl focus:outline-none hover:scale-110 transition-transform"
                >
                  {star <= rating ? <FaStar className="text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]" /> : <FaRegStar className="text-zinc-600 hover:text-lime-400/50" />}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-zinc-400 mb-2 font-medium">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              rows="4"
              placeholder="Tell us about your experience..."
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-lime-400 text-zinc-950 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting || !rating || !feedback}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;