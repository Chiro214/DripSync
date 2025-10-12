'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { EventsPage } from './components/pages/EventsPage';
import { TeamPage } from './components/pages/TeamPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { MyBookings } from './components/MyBookings';

const AdminDashboard = ({ user }: { user: any }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Signed in as: {user?.email ?? 'Unknown'}</p>
      <div className="space-x-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const loaderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    loaderTimeoutRef.current = window.setTimeout(() => setIsLoading(false), 8000);

    // Get current Supabase session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 drip-gradient-bg flex items-center justify-center z-50">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.video
            className="w-full h-full object-cover"
            src="src/styles/videos/loader.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => {
              if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
              setIsLoading(false);
            }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </motion.div>
      </div>
    );
  }

  // Supabase Auth: show login if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  }

  // Admin dashboard
  if (user.email === 'chiragshukla236@gmail.com') {
    return <AdminDashboard user={user} />;
  }

  // Render normal pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'events':
        return <EventsPage onNavigate={handleNavigation} user={user} />;
      case 'team':
        return <TeamPage onNavigate={handleNavigation} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen drip-gradient-bg relative">
      {/* Background & floating elements */}
      <div className="fixed inset-0 drip-noise opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" />

      {/* Header + My Bookings */}
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      <div className="fixed top-20 right-4 z-50">
        <MyBookings userId={user.id} />
      </div>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigation} />

      {/* Logout button */}
      <button
        className="fixed top-4 right-4 bg-red-500 text-white px-3 py-1 rounded z-50"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 drip-glass rounded-full border border-drip-glass-border text-drip-neon-teal hover:bg-drip-neon-teal hover:text-drip-dark-start transition-colors z-50 drip-glow"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        transition={{ delay: 3 }}
      >
        <motion.svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path d="M7 14l5-5 5 5" />
          <path d="M7 20l5-5 5 5" />
        </motion.svg>
      </motion.button>
    </div>
  );
}
