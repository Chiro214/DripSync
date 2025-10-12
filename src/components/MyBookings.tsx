// src/components/MyBookings.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MyBookingsProps {
  userId: string;
}

interface Booking {
  id: string;
  event_id: string;
  txn_id: string;
  created_at: string;
  events: {
    title: string;
    date: string;
    venue: string;
    price: number;
  }[] | null;
}

export function MyBookings({ userId }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`id, event_id, txn_id, created_at, events(title, date, venue, price)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching bookings:', error);
      else setBookings(data as Booking[]);
    };

    if (show) fetchBookings();
  }, [userId, show]);

  return (
    <div className="flex flex-col items-end">
      <button
        className="bg-green-600 text-white px-3 py-1 rounded mb-2"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide My Bookings' : 'Show My Bookings'}
      </button>

      {show && (
        <div className="bg-gray-800 text-white p-4 rounded shadow max-h-96 overflow-y-auto w-80">
          {bookings.length === 0 && <p>No bookings yet.</p>}
          {bookings.map((b) => {
            const evt = b.events?.[0] ?? null;
            return (
              <div key={b.id} className="border-b border-gray-600 py-2">
                <p className="font-bold">{evt?.title ?? 'Unknown Event'}</p>
                <p>Date: {evt?.date ?? 'N/A'}</p>
                <p>Venue: {evt?.venue ?? 'N/A'}</p>
                <p>Price: {evt?.price != null ? `₹${evt.price}` : 'N/A'}</p>
                <p>Txn ID: {b.txn_id}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
