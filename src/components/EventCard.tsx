'use client';

import { motion, useSpring } from 'motion/react';
import { Calendar, MapPin, Clock, Users, Star, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  genre: string;
  capacity: number;
  price: string;
  image: string;
  featured?: boolean;
  status: 'upcoming' | 'selling' | 'sold-out';
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function EventCard({ event, onClick, variant = 'default' }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(1, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const cardVariants = {
    default: "aspect-[4/5]",
    compact: "aspect-[3/2]", 
    featured: "aspect-[16/9]"
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={`group cursor-pointer ${cardVariants[variant]} perspective-1000`}
      style={{ scale, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* Glass Background */}
        <motion.div
          className="absolute inset-0 drip-glass border border-drip-glass-border rounded-2xl"
          animate={{
            borderColor: isHovered 
              ? 'rgba(0, 212, 170, 0.4)' 
              : 'rgba(255, 255, 255, 0.1)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Image */}
        <div className="relative h-3/5 overflow-hidden rounded-t-2xl">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Dynamic Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-drip-dark-start/90 via-drip-dark-start/40 to-transparent"
            animate={{
              background: isHovered 
                ? 'linear-gradient(to top, rgba(15, 15, 35, 0.95), rgba(0, 212, 170, 0.1), transparent)'
                : 'linear-gradient(to top, rgba(15, 15, 35, 0.90), rgba(15, 15, 35, 0.40), transparent)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animated Particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-drip-neon-teal rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: '100%', 
                    opacity: 0 
                  }}
                  animate={{ 
                    y: '0%', 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2,
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          )}

          {/* Status Badge with Animation */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Badge 
              className={`relative overflow-hidden font-semibold px-3 py-1.5 ${
                event.status === 'upcoming' ? 'bg-drip-neon-teal text-drip-dark-start' : 
                event.status === 'selling' ? 'bg-drip-warm-yellow text-drip-dark-start' : 
                'bg-red-500 text-white'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">
                {event.status === 'upcoming' ? 'Coming Soon' : 
                 event.status === 'selling' ? 'On Sale' : 'Sold Out'}
              </span>
            </Badge>
          </motion.div>

          {/* Featured Badge */}
          {event.featured && (
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-gradient-to-r from-drip-deep-purple to-drip-deep-purple/80 text-white font-semibold px-3 py-1.5 relative overflow-hidden">
                <Star className="w-3 h-3 mr-1" />
                <span>Featured</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                />
              </Badge>
            </motion.div>
          )}

          {/* Genre Tag */}
          <motion.div 
            className="absolute bottom-4 left-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Badge 
              variant="outline" 
              className="border-drip-neon-teal/30 text-drip-neon-teal bg-drip-neon-teal/10 backdrop-blur-sm font-medium"
            >
              {event.genre}
            </Badge>
          </motion.div>

          {/* Price Tag */}
          <motion.div 
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="bg-drip-warm-yellow text-drip-dark-start px-3 py-1.5 rounded-lg font-bold text-sm">
              {event.price}
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="h-2/5 p-6 flex flex-col justify-between relative z-10">
          <div className="space-y-3">
            {/* Title */}
            <motion.h3 
              className="text-xl font-bold text-white group-hover:text-drip-neon-teal transition-colors line-clamp-2 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {event.title}
            </motion.h3>
            
            {/* Event Details */}
            <div className="space-y-2 text-sm">
              <motion.div 
                className="flex items-center gap-2 text-white/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Calendar className="w-4 h-4 text-drip-neon-teal flex-shrink-0" />
                <span className="font-medium">{event.date}</span>
                <Clock className="w-4 h-4 text-drip-neon-teal ml-2 flex-shrink-0" />
                <span>{event.time}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-white/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <MapPin className="w-4 h-4 text-drip-neon-teal flex-shrink-0" />
                <span className="truncate font-medium">{event.venue}, {event.city}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-white/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Users className="w-4 h-4 text-drip-neon-teal flex-shrink-0" />
                <span className="text-sm">{event.capacity.toLocaleString()} capacity</span>
              </motion.div>
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button
              className={`w-full relative overflow-hidden font-semibold transition-all duration-300 ${
                event.status === 'sold-out' 
                  ? 'bg-gray-600/50 cursor-not-allowed text-white/50' 
                  : 'bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 hover:from-drip-neon-teal/90 hover:to-drip-neon-teal/70 text-drip-dark-start group/btn'
              }`}
              disabled={event.status === 'sold-out'}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              {!event.status.includes('sold-out') && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-drip-warm-yellow to-drip-neon-teal"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <span className="relative z-10 flex items-center justify-center">
                {event.status === 'sold-out' ? (
                  'Sold Out'
                ) : event.status === 'upcoming' ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Notify Me
                  </>
                ) : (
                  <>
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? '0 0 50px rgba(0, 212, 170, 0.3), 0 0 100px rgba(0, 212, 170, 0.1)'
              : '0 0 0px rgba(0, 212, 170, 0)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, var(--drip-neon-teal), var(--drip-warm-yellow), var(--drip-deep-purple), var(--drip-neon-teal))',
            backgroundSize: '300% 300%',
            padding: '1px',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-transparent rounded-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}