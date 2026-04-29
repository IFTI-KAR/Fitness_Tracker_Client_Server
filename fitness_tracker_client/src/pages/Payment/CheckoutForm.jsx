import React, { useEffect, useState } from 'react';
import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ bookingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('https://fitness-tracker-server-theta.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: bookingInfo.price })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [bookingInfo.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: bookingInfo.userName,
          email: bookingInfo.userEmail
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setSuccess('Payment successful!');

      const paymentData = {
        trainerName: bookingInfo.trainerName,
        slot: bookingInfo.slot,
        package: bookingInfo.package,
        price: bookingInfo.price,
        email: bookingInfo.userEmail,
        userName: bookingInfo.userName,
        transactionId: paymentIntent.id
      };

      fetch('https://fitness-tracker-server-theta.vercel.app/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay ${bookingInfo.price}
      </button>
    </form>
  );
};

export default CheckoutForm;
