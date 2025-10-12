import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (type) => {
    setLoading(true);
    if (type === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Check your email for verification link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else alert('Logged in successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-20 space-y-4">
      <input
        className="border p-2 rounded w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 rounded w-64"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading} className="bg-blue-500 text-white p-2 rounded w-64" onClick={() => handleLogin('login')}>
        {loading ? 'Loading...' : 'Login'}
      </button>
      <button className="text-blue-400" onClick={() => handleLogin('signup')}>
        Sign Up
      </button>
    </div>
  );
}
