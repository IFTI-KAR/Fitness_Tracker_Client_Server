import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ bookingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: bookingInfo.price, trainerId: bookingInfo.trainerId }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [bookingInfo.price, bookingInfo.trainerId]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: bookingInfo.userName,
            email: bookingInfo.userEmail,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setSuccess('Payment successful!');
      const paymentInfo = {
        trainerName: bookingInfo.trainerName,
        trainerId: bookingInfo.trainerId,
        slot: bookingInfo.slot,
        package: bookingInfo.package,
        price: bookingInfo.price,
        email: bookingInfo.userEmail,
        paidAt: new Date(),
        transactionId: paymentIntent.id,
      };

      fetch('https://fitness-tracker-server-theta.vercel.app/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800 shadow-inner">
      <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#fff',
              '::placeholder': {
                color: '#a1a1aa',
              },
            },
            invalid: {
              color: '#ef4444',
            },
          },
        }} />
      </div>
      {error && <p className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20 text-center">{error}</p>}
      {success && <p className="text-lime-400 bg-lime-400/10 p-3 rounded-lg text-sm border border-lime-400/20 text-center">{success}</p>}
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full bg-lime-400 text-zinc-950 font-bold px-6 py-4 rounded-xl hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Pay ${bookingInfo.price}
      </button>
    </form>
  );
};

const Payment = () => {
  const { user } = useContext(AuthContext);
  const bookingInfo = useLoaderData();

  // Overwrite email and name from AuthContext (if available)
  bookingInfo.userEmail = user?.email || bookingInfo.userEmail;
  bookingInfo.userName = user?.displayName || bookingInfo.userName;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 py-16">
        <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase tracking-tight text-white border-b border-zinc-800 pb-6">Confirm Your Booking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-lg">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Trainer</span>
              <span className="font-bold text-white">{bookingInfo.trainerName}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Slot</span>
              <span className="font-bold text-lime-400">{bookingInfo.slot}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Package</span>
              <span className="font-medium text-white">{bookingInfo.package}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
              <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Price</span>
              <span className="font-bold text-lime-400">${bookingInfo.price}</span>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 md:col-span-2 flex flex-col md:flex-row justify-between">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Name</span>
                <span className="font-medium text-white">{bookingInfo.userName}</span>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <span className="text-zinc-500 uppercase tracking-wider text-xs font-bold block mb-1">Email</span>
                <span className="font-medium text-zinc-400">{bookingInfo.userEmail}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <Elements stripe={stripePromise}>
              <CheckoutForm bookingInfo={bookingInfo} />
            </Elements>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
