'use client';

import { motion, useSpring } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Twitter, Instagram, Linkedin, Music, Award, ExternalLink } from 'lucide-react';
import { TeamMember } from '../data/team';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(1, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const socialIcons = {
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    spotify: Music
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 20;
    const rotateYValue = (centerX - x) / 20;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ scale, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-2xl h-full">
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

        {/* Image Section */}
        <div className="relative h-80 overflow-hidden rounded-t-2xl">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ImageWithFallback
              src={member.image}
              alt={member.name}
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
          
          {/* Floating Particles on Hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
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
                    scale: [0, 1.5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.3,
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          )}

          {/* Featured Badge */}
          {member.featured && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 text-drip-dark-start font-semibold px-3 py-1.5 relative overflow-hidden">
                <Award className="w-3 h-3 mr-1" />
                <span>Core Team</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 4 
                  }}
                />
              </Badge>
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div
            className="absolute top-4 left-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20
            }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {Object.entries(member.social).map(([platform, handle]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <motion.div
                  key={platform}
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 drip-glass border-white/20 text-white hover:text-drip-neon-teal hover:border-drip-neon-teal hover:bg-drip-neon-teal/10 transition-all duration-200 relative overflow-hidden group/social"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Opening ${platform}: ${handle}`);
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-drip-neon-teal/20"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <Icon className="w-4 h-4 relative z-10" />
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Role Badge */}
          <motion.div 
            className="absolute bottom-4 left-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Badge 
              className="bg-gradient-to-r from-drip-warm-yellow/20 to-drip-warm-yellow/10 text-drip-warm-yellow border border-drip-warm-yellow/30 backdrop-blur-sm font-medium px-3 py-1.5"
            >
              {member.role}
            </Badge>
          </motion.div>

          {/* Contact Button */}
          <motion.div 
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <Button
              size="sm"
              className="bg-drip-deep-purple/80 hover:bg-drip-deep-purple text-white px-3 py-1.5 text-xs font-medium relative overflow-hidden group/contact"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-drip-neon-teal to-drip-deep-purple"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center">
                <ExternalLink className="w-3 h-3 mr-1" />
                Connect
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4 relative z-10">
          {/* Name & Achievement */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white group-hover:text-drip-neon-teal transition-colors">
              {member.name}
            </h3>
            <motion.div
              className="flex items-center gap-2 text-drip-warm-yellow/80 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-2 h-2 bg-drip-warm-yellow rounded-full animate-pulse" />
              <span>Available for collaboration</span>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.p 
            className="text-white/70 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {member.bio}
          </motion.p>

          {/* Skills with Enhanced Design */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white/80">Expertise</h4>
              <motion.div
                className="w-12 h-0.5 bg-gradient-to-r from-drip-neon-teal to-drip-warm-yellow"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {member.skills.slice(0, 4).map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 1.2 + skillIndex * 0.1,
                    type: "spring",
                    stiffness: 200 
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    className="w-full justify-center bg-drip-deep-purple/20 text-drip-deep-purple border border-drip-deep-purple/30 hover:bg-drip-deep-purple/30 transition-all duration-200 cursor-default text-xs py-1"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Show remaining skills count if more than 4 */}
            {member.skills.length > 4 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <Badge 
                  variant="outline"
                  className="border-white/20 text-white/60 bg-white/5 text-xs"
                >
                  +{member.skills.length - 4} more
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Advanced Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? '0 0 60px rgba(0, 212, 170, 0.2), 0 0 120px rgba(0, 212, 170, 0.1)'
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
            duration: 4,
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