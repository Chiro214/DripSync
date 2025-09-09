'use client';

import { motion } from 'motion/react';
import { TeamCard } from '../TeamCard';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowRight, Users, Award, Heart } from 'lucide-react';
import { teamMembers } from '../../data/team';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TeamPageProps {
  onNavigate: (page: string) => void;
}

export function TeamPage({ onNavigate }: TeamPageProps) {
  const coreTeam = teamMembers.filter(member => member.featured);
  const supportTeam = teamMembers.filter(member => !member.featured);

  const values = [
    {
      icon: '🎵',
      title: 'Music First',
      description: 'Every decision we make is driven by our love for electronic music and creating authentic experiences.'
    },
    {
      icon: '🔥',
      title: 'Innovation',
      description: 'We constantly push boundaries with cutting-edge technology and creative event concepts.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building lasting relationships with artists, venues, and music lovers across India.'
    },
    {
      icon: '⚡',
      title: 'Excellence',
      description: 'Uncompromising commitment to delivering world-class events that exceed expectations.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-drip-warm-yellow/10 text-drip-warm-yellow border border-drip-warm-yellow/20 mb-4">
            Meet the Crew
          </Badge>
          <h1 className="text-white mb-4">Our Team</h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            The passionate professionals who make the magic happen. Our diverse team of creatives, 
            technologists, and music enthusiasts work together to deliver unforgettable experiences.
          </p>
        </motion.div>

        {/* Core Team */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">Core Team</h2>
            <p className="text-white/70">The leadership driving DripSync's vision forward</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Support Team */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">Extended Team</h2>
            <p className="text-white/70">The talented specialists who bring expertise to every event</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-drip-deep-purple/10 text-drip-deep-purple border border-drip-deep-purple/20 mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl font-semibold text-white mb-4">What Drives Us</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              These core values shape every decision we make and every event we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="drip-glass rounded-xl p-6 border border-drip-glass-border text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-drip-neon-teal transition-colors">
                  {value.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Behind the Scenes */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="drip-glass rounded-2xl overflow-hidden border border-drip-glass-border">
            <div className="grid md:grid-cols-2">
              <div className="relative h-80 md:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1680907899793-08419dc6f4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG1peGluZyUyMGVsZWN0cm9uaWMlMjBtdXNpYyUyMG5pZ2h0fGVufDF8fHx8MTc1NzEwODUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team working behind the scenes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-drip-neon-teal/20 to-drip-deep-purple/20" />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-4 w-fit">
                  Behind the Magic
                </Badge>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  More Than Just Events
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We're a family of music lovers, tech enthusiasts, and creative minds who believe 
                  in the power of electronic music to bring people together. Every beat drop, 
                  every light show, every moment of pure euphoria is crafted with precision and passion.
                </p>
                <div className="flex items-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-drip-neon-teal" />
                    <span className="text-white/80">20+ Team Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-drip-warm-yellow" />
                    <span className="text-white/80">25+ Awards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-white/80">1M+ Happy Faces</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start drip-glow group w-fit"
                >
                  Join Our Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="drip-glass rounded-2xl p-8 md:p-12 border border-drip-glass-border text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Want to Work With Us?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for electronic music 
            and creating extraordinary experiences. Join the DripSync family!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              className="bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start drip-glow group"
              size="lg"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => onNavigate('events')}
              variant="outline"
              className="border-2 border-drip-warm-yellow text-drip-warm-yellow hover:bg-drip-warm-yellow hover:text-drip-dark-start"
              size="lg"
            >
              See Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}