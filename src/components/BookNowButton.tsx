import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface BookNowButtonProps {
  eventId: string;
  price: number;
  userId: string;
  userEmail: string;
}

export function BookNowButton({ eventId, price, userId, userEmail }: BookNowButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBook = async () => {
    setIsProcessing(true);
    try {
      // 1️⃣ Generate a unique order ID
      const orderId = `ORD-${Date.now()}`;

      // 2️⃣ Build UPI link
      const upiLink = `upi://pay?pa=yourvpa@bank&pn=Your+Name&tr=${orderId}&am=${price.toFixed(
        2
      )}&cu=INR&tn=Ticket+${orderId}`;

      // 3️⃣ Open UPI intent (mobile) or show link/QR (desktop)
      window.location.href = upiLink;

      // 4️⃣ After payment, prompt user to enter txn ID
      const txnId = prompt('Enter transaction ID after payment:');
      if (!txnId) {
        alert('Booking cancelled. Transaction ID is required.');
        setIsProcessing(false);
        return;
      }

      // 5️⃣ Insert booking directly into Supabase
      const { error } = await supabase.from('bookings').insert([
        {
          user_id: userId,
          event_id: eventId,
          txn_id: txnId,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) alert('Error saving booking: ' + error.message);
      else alert('Booking confirmed!');

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      disabled={isProcessing}
      onClick={handleBook}
    >
      {isProcessing ? 'Processing...' : `Book Now — ₹${price}`}
    </button>
  );
}
