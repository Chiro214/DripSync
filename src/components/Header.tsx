'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MorphingLogo } from './MorphingLogo';
import { Button } from './ui/button';
import { Menu, X, Zap } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced scroll-based transforms
  const headerBg = useTransform(
    scrollY,
    [0, 50, 100],
    ['rgba(15, 15, 35, 0)', 'rgba(15, 15, 35, 0.7)', 'rgba(15, 15, 35, 0.95)']
  );
  
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);
  
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const headerY = useSpring(0, springConfig);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Future Events' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
        style={{
          backgroundColor: headerBg,
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          borderBottomColor: useTransform(borderOpacity, (v) => `rgba(0, 212, 170, ${v})`),
          y: headerY,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 border-b border-transparent"
          style={{
            borderBottomColor: useTransform(borderOpacity, (v) => `rgba(255, 255, 255, ${v * 0.1})`),
          }}
        />
        
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Enhanced Logo */}
          <motion.div
            className="cursor-pointer relative"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layoutId="logo"
          >
            <MorphingLogo />
            {/* Logo glow effect */}
            <motion.div
              className="absolute inset-0 bg-drip-neon-teal/20 rounded-lg blur-xl -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 mx-1 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-drip-neon-teal bg-drip-neon-teal/10'
                      : 'text-white hover:text-drip-neon-teal hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active indicator with morphing animation */}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-drip-neon-teal/20 via-drip-neon-teal/10 to-drip-neon-teal/20 rounded-lg"
                      layoutId="activeNavBg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-drip-neon-teal/5 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                onClick={() => onNavigate('contact')}
                className="relative bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 hover:from-drip-neon-teal/90 hover:to-drip-neon-teal/70 text-drip-dark-start font-semibold px-6 py-3 group overflow-hidden"
                size="lg"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-drip-warm-yellow to-drip-neon-teal"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  Book Event
                </span>
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-drip-neon-teal rounded-lg blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-lg text-white hover:bg-white/10 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-drip-neon-teal/20 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-drip-neon-teal via-drip-warm-yellow to-drip-deep-purple"
          style={{
            scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
            transformOrigin: "left"
          }}
        />
      </motion.header>

      {/* Enhanced Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        {/* Backdrop with blur */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
        />
        
        {/* Enhanced Menu Panel */}
        <motion.nav
          className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-drip-dark-start/95 to-drip-dark-end/95 backdrop-blur-xl border-l border-drip-neon-teal/20 p-6 pt-20 overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Menu Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">Navigation</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-drip-neon-teal to-drip-warm-yellow" />
          </motion.div>

          {/* Navigation Items */}
          <div className="space-y-3 mb-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left text-lg py-4 px-6 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  currentPage === item.id
                    ? 'text-drip-neon-teal bg-gradient-to-r from-drip-neon-teal/20 to-drip-neon-teal/10 border border-drip-neon-teal/30'
                    : 'text-white hover:text-drip-neon-teal hover:bg-white/5'
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : 50 
                }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-drip-neon-teal/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                
                <span className="relative z-10 flex items-center">
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-drip-neon-teal rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              x: isMenuOpen ? 0 : 50 
            }}
            transition={{ delay: navItems.length * 0.1 + 0.4 }}
            className="pt-6 border-t border-white/10"
          >
            <Button
              onClick={() => {
                onNavigate('contact');
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 hover:from-drip-neon-teal/90 hover:to-drip-neon-teal/70 text-drip-dark-start font-semibold py-4 relative overflow-hidden group"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-drip-warm-yellow to-drip-neon-teal"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center">
                <Zap className="mr-2 h-5 w-5" />
                Book Event
              </span>
            </Button>
            
            {/* Additional mobile info */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-white/60 text-sm mb-2">Ready to sync your experience?</p>
              <div className="flex justify-center space-x-4 text-white/40">
                <span className="text-xs">500+ Events</span>
                <span className="text-xs">•</span>
                <span className="text-xs">1M+ Attendees</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}