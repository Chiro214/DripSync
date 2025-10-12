import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface AdminDashboardProps {
  user: any;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [price, setPrice] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  // Fetch events on load
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async () => {
    const { error } = await supabase.from('events').insert([
      {
        title,
        date,
        venue,
        price: Number(price),
        created_by: user.id,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert('Event created!');
      setTitle(''); setDate(''); setVenue(''); setPrice('');
      fetchEvents(); // Refresh event list
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4 bg-gray-800 text-white rounded shadow mt-20">
      <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>

      {/* Event Creation Form */}
      <input
        className="w-full p-2 rounded text-black"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 rounded text-black"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        className="w-full p-2 rounded text-black"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
      />
      <input
        className="w-full p-2 rounded text-black"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className="bg-blue-600 p-2 rounded w-full"
        onClick={createEvent}
      >
        Create Event
      </button>

      {/* List of Events */}
      <h2 className="text-xl font-semibold mt-6">All Events</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((evt) => (
            <li key={evt.id} className="bg-gray-700 p-2 rounded">
              <strong>{evt.title}</strong> <br />
              {evt.venue && <span>{evt.venue} <br /></span>}
              {evt.date && <span>{new Date(evt.date).toLocaleString()} <br /></span>}
              {evt.price !== null && <span>₹{evt.price}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
