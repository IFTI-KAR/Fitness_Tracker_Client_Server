import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { FaStar, FaRegStar, FaClock, FaCalendarAlt, FaDumbbell } from 'react-icons/fa';
import ReviewModal from './ReviewModal'; 
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';

const BookedTrainer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`https://fitness-tracker-server-theta.vercel.app/payments/user/${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleSubmitReview = async (reviewData) => {
    try {
      const response = await fetch('https://fitness-tracker-server-theta.vercel.app/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewData,
          trainerId: selectedBooking.trainerId,
          bookingId: selectedBooking._id,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      
      // Close modal
      setShowReviewModal(false);
      setSelectedBooking(null);
      // Re-fetch to update any possible data
      fetchBookings();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin inline-block w-10 h-10 border-[4px] border-lime-400 border-t-transparent rounded-full mb-4"></div>
          <p className="text-zinc-400 font-medium tracking-wide animate-pulse">Loading your trainers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center bg-zinc-900/50 backdrop-blur-md p-8 rounded-2xl border border-red-500/30">
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="text-center bg-zinc-900/50 backdrop-blur-md p-10 rounded-2xl border border-zinc-800 max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Trainers Booked</h2>
          <p className="text-zinc-400 mb-6">You haven't booked any trainers yet. Ready to start your fitness journey?</p>
          <button 
            onClick={() => navigate('/trainers')}
            className="bg-lime-400 text-zinc-950 font-bold px-8 py-3 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:scale-105"
          >
            Find a Trainer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-white pb-10">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 uppercase tracking-tight">Your Booked Trainers</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bookings.map((booking) => {
            const trainer = booking.trainerData;
            return (
              <div key={booking._id} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/80">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-full md:w-1/3">
                    <img 
                      src={trainer?.profileImage || '/default-trainer.jpg'} 
                      alt={trainer?.fullName || 'Trainer'}
                      className="w-full h-40 object-cover rounded-xl border-2 border-zinc-800"
                    />
                    <div className="mt-4 flex items-center justify-center bg-zinc-950/50 py-2 rounded-lg border border-zinc-800">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-lime-400 text-sm">
                          {star <= (trainer?.averageRating || 0) ? <FaStar /> : <FaRegStar className="text-zinc-600" />}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-1 text-white">{trainer?.fullName || 'Unknown Trainer'}</h2>
                    <span className="inline-block bg-lime-400/20 text-lime-400 text-xs font-bold px-3 py-1 rounded-full border border-lime-400/30 mb-4 tracking-wider">
                      {booking.package} PACKAGE
                    </span>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <FaDumbbell className="mr-3 text-lime-400 text-lg" />
                        <span className="text-zinc-300">{trainer?.skills?.join(', ') || 'General Fitness'}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaClock className="mr-3 text-lime-400 text-lg" />
                        <span className="text-zinc-300">Session: <span className="font-semibold text-white">{booking.slotTime}</span></span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaCalendarAlt className="mr-3 text-lime-400 text-lg" />
                        <span className="text-zinc-300">Day: <span className="font-semibold text-white">{booking.slotDate || trainer?.availableDays?.[0] || 'Flexible'}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/50 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Amount Paid</p>
                      <p className="text-xl font-bold text-white">${booking.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Booking Date</p>
                      <p className="text-lg font-medium text-white">{new Date(booking.paidAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openReviewModal(booking)}
                  className="w-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold py-3 px-4 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]"
                >
                  Leave a Review
                </button>
              </div>
            );
          })}
        </div>
      </main>
     
      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <ReviewModal
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
          onSubmit={handleSubmitReview}
          trainerName={selectedBooking?.trainerData?.fullName}
        />
      )}
    </div>
  );
};

export default BookedTrainer;