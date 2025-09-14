'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Import your logo SVG/component at the top

interface MorphingLogoProps {
  className?: string;
}

export function MorphingLogo({ className = "" }: MorphingLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMorphed, setIsMorphed] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll progress to determine morph state
  const morphProgress = useTransform(scrollY, [100, 300], [0, 1]);
  
  useEffect(() => {
    const unsubscribe = morphProgress.on('change', (value) => {
      setIsMorphed(value > 0.5);
    });
    
    return unsubscribe;
  }, [morphProgress]);

  const letterVariants = {
    initial: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0, 
      rotate: 0 
    },
    morphed: (index: number) => {
      // Define target positions for each letter to form monkey face
      const positions = [
        { x: -20, y: -15, scale: 0.3, rotate: -45, opacity: 0 }, // D -> left eye
        { x: -10, y: -8, scale: 0.4, rotate: 20, opacity: 0 },   // r -> eyebrow
        { x: 0, y: -12, scale: 0.2, rotate: 0, opacity: 0 },     // i -> nose bridge
        { x: 10, y: -8, scale: 0.4, rotate: -20, opacity: 0 },   // p -> eyebrow
        { x: 15, y: 0, scale: 0.6, rotate: 45, opacity: 0 },     // S -> ear
        { x: 5, y: 8, scale: 0.3, rotate: 90, opacity: 0 },      // y -> mouth
        { x: -5, y: 12, scale: 0.4, rotate: -30, opacity: 0 },   // n -> chin
        { x: -15, y: 5, scale: 0.5, rotate: 60, opacity: 0 },    // c -> cheek
      ];
      
      return positions[index] || { x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 };
    }
  };

  const letters = "DripSync".split("");

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Text Logo */}
      <motion.div 
        className="flex items-center space-x-1"
        animate={isMorphed ? "morphed" : "initial"}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={`letter-${index}`}
            custom={index}
            variants={letterVariants}
            className="inline-block drip-text-gradient font-bold text-2xl"
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.05
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Monkey Logo - appears when morphed */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isMorphed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Replace MonkeyLogo with your logo */}
        <img src="src/styles/di.png" className="w-16 h-16 z-10" alt="Logo" />
        {/* Or use <img src="/path/to/logo.svg" className="w-12 h-12" alt="Logo" /> */}
      </motion.div>
    </div>
  );
}

function MonkeyLogo() {
  return (
    <div className="relative w-12 h-12">
      {/* Headphones */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          scale: [1, 1.05, 1],
          rotateZ: [0, 2, 0, -2, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <HeadphonesComponent />
      </motion.div>
      
      {/* Monkey Face */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          y: [0, -1, 0, 1, 0] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <MonkeyFaceComponent />
      </motion.div>
      
      {/* Goggles with glare animation */}
      <motion.div
        className="absolute inset-0"
      >
        <GogglesComponent />
      </motion.div>
    </div>
  );
}

function HeadphonesComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
      {/* Headphone band */}
      <motion.path
        d="M8 20C8 12 14 6 24 6C34 6 40 12 40 20"
        stroke="url(#headphone-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left speaker */}
      <motion.circle
        cx="8"
        cy="24"
        r="4"
        fill="url(#speaker-gradient)"
        stroke="var(--drip-neon-teal)"
        strokeWidth="1"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 5px rgba(0, 212, 170, 0.3)",
            "0 0 15px rgba(0, 212, 170, 0.6)",
            "0 0 5px rgba(0, 212, 170, 0.3)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Right speaker */}
      <motion.circle
        cx="40"
        cy="24"
        r="4"
        fill="url(#speaker-gradient)"
        stroke="var(--drip-neon-teal)"
        strokeWidth="1"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 5px rgba(0, 212, 170, 0.3)",
            "0 0 15px rgba(0, 212, 170, 0.6)",
            "0 0 5px rgba(0, 212, 170, 0.3)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      
      {/* Sound waves */}
      <motion.g opacity="0.7">
        <motion.path
          d="M4 24C4 24 6 22 6 24C6 26 4 24 4 24"
          stroke="var(--drip-neon-teal)"
          strokeWidth="1"
          fill="none"
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.path
          d="M44 24C44 24 46 22 46 24C46 26 44 24 44 24"
          stroke="var(--drip-neon-teal)"
          strokeWidth="1"
          fill="none"
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.g>
      
      <defs>
        <linearGradient id="headphone-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--drip-neon-teal)" />
          <stop offset="100%" stopColor="var(--drip-warm-yellow)" />
        </linearGradient>
        <radialGradient id="speaker-gradient">
          <stop offset="0%" stopColor="var(--drip-deep-purple)" />
          <stop offset="100%" stopColor="var(--drip-neon-teal)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function MonkeyFaceComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
      {/* Face outline */}
      <ellipse cx="24" cy="26" rx="10" ry="12" fill="url(#face-gradient)" />
      
      {/* Eyes */}
      <motion.circle
        cx="20"
        cy="22"
        r="2"
        fill="white"
        animate={{ 
          scaleY: [1, 0.1, 1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatDelay: 2 
        }}
      />
      <motion.circle
        cx="28"
        cy="22"
        r="2"
        fill="white"
        animate={{ 
          scaleY: [1, 0.1, 1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatDelay: 2,
          delay: 0.1
        }}
      />
      
      {/* Pupils */}
      <motion.circle
        cx="20"
        cy="22"
        r="1"
        fill="#000"
        animate={{ 
          x: [20, 21, 20, 19, 20],
          y: [22, 21.5, 22, 22.5, 22]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.circle
        cx="28"
        cy="22"
        r="1"
        fill="#000"
        animate={{ 
          x: [28, 29, 28, 27, 28],
          y: [22, 21.5, 22, 22.5, 22]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      
      {/* Nose */}
      <ellipse cx="24" cy="26" rx="1" ry="0.5" fill="var(--drip-deep-purple)" />
      
      {/* Mouth */}
      <motion.path
        d="M21 30C21 30 22.5 32 24 32C25.5 32 27 30 27 30"
        stroke="var(--drip-deep-purple)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{ 
          pathLength: [0.8, 1, 0.8] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      />
      
      <defs>
        <radialGradient id="face-gradient">
          <stop offset="0%" stopColor="var(--drip-warm-yellow)" />
          <stop offset="100%" stopColor="var(--drip-neon-teal)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function GogglesComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
      {/* Goggle frames */}
      <circle 
        cx="20" 
        cy="22" 
        r="6" 
        fill="rgba(255, 255, 255, 0.1)" 
        stroke="var(--drip-neon-teal)" 
        strokeWidth="1"
      />
      <circle 
        cx="28" 
        cy="22" 
        r="6" 
        fill="rgba(255, 255, 255, 0.1)" 
        stroke="var(--drip-neon-teal)" 
        strokeWidth="1"
      />
      
      {/* Connecting bridge */}
      <line 
        x1="26" 
        y1="22" 
        x2="22" 
        y2="22" 
        stroke="var(--drip-neon-teal)" 
        strokeWidth="1"
      />
      
      {/* Goggle straps */}
      <path 
        d="M14 22C12 20 10 18 8 18"
        stroke="var(--drip-neon-teal)"
        strokeWidth="1"
        fill="none"
      />
      <path 
        d="M34 22C36 20 38 18 40 18"
        stroke="var(--drip-neon-teal)"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Glare effect - animates every 5 seconds */}
      <motion.g>
        <motion.ellipse
          cx="22"
          cy="20"
          rx="2"
          ry="4"
          fill="url(#glare-gradient)"
          opacity="0"
          animate={{
            opacity: [0, 0.8, 0],
            x: [18, 24, 30]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 4.2,
            ease: "easeInOut"
          }}
        />
        <motion.ellipse
          cx="30"
          cy="20"
          rx="2"
          ry="4"
          fill="url(#glare-gradient)"
          opacity="0"
          animate={{
            opacity: [0, 0.8, 0],
            x: [26, 32, 38]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 4.2,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
      </motion.g>
      
      <defs>
        <linearGradient id="glare-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}