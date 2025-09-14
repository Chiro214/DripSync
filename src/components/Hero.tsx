'use client';

import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Button } from './ui/button';
import { Play, ArrowRight, Volume2, Users, Calendar, Star } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
// Removed invalid import for image

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
        mouseX.set(x * 20);
        mouseY.set(y * 20);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Particle system
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div className="relative w-full h-full">
          {/* Replace ImageWithFallback with a debug-friendly <img> that falls back */}
          <img
            src="src/styles/kj.jpg"
            alt="Electronic music festival with crowd and lights"
            className="w-full h-full object-cover"
            onError={(e) => {
              // show placeholder if original fails
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = 'src/styles/kj.jpg'; // put kj.jpg in public/styles/
            }}
          />
          
          {/* Advanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-start/80 via-drip-dark-start/40 to-drip-dark-end/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-drip-deep-purple/20 via-transparent to-drip-neon-teal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-drip-dark-end via-transparent to-transparent" />
          
          {/* Interactive Noise Texture */}
          <div className="absolute inset-0 drip-noise opacity-40" />
          
          {/* Dynamic Glow Effects */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-drip-neon-teal/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-drip-warm-yellow/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </motion.div>

      {/* Floating Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, particle.size, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Interactive Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-drip-neon-teal/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ delay: i * 0.01 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{ opacity }}
      >
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 mb-4 relative z-10"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 170, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 bg-drip-neon-teal rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Dynamic Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4">
            <motion.span 
              className="block drip-text-gradient mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Sync Your
            </motion.span>
            <motion.span 
              className="block text-white mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Experience
            </motion.span>
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span className="text-drip-warm-yellow">Drop</span>
              <span className="text-white"> the </span>
              <span className="text-drip-neon-teal">Beat</span>
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced Subtitle */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          India's premier event organizing company crafting immersive experiences 
          that synchronize cutting-edge music, technology, and unforgettable moments. 
          <span className="text-drip-neon-teal font-medium">500+ events delivered.</span>
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-8 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { icon: Users, value: "1M+", label: "Attendees" },
            { icon: Calendar, value: "500+", label: "Events" },
            { icon: Volume2, value: "12+", label: "Years" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
            >
              <stat.icon className="w-6 h-6 text-drip-neon-teal mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with Advanced Interactions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => onNavigate('events')}
              className="relative bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start font-semibold px-8 py-6 text-lg group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-2 border-drip-warm-yellow text-drip-warm-yellow hover:bg-drip-warm-yellow hover:text-drip-dark-start group px-8 py-6 text-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-drip-warm-yellow"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Book an Event
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Interactive Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-drip-neon-teal rounded-full opacity-60"
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-3 h-3 bg-drip-warm-yellow rounded-full opacity-60"
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-20 w-2 h-2 bg-drip-deep-purple rounded-full opacity-60"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mb-2"
            animate={{ 
              borderColor: [
                "rgba(255,255,255,0.3)", 
                "rgba(0,212,170,0.8)", 
                "rgba(245,158,11,0.8)",
                "rgba(255,255,255,0.3)"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-drip-neon-teal rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.span
            className="text-white/60 text-xs"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}