'use client';

import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Hero } from '../Hero';
import { EventCard } from '../EventCard';
import { TeamCard } from '../TeamCard';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Calendar, 
  Award, 
  Zap, 
  Music, 
  Headphones,
  Volume2,
  TrendingUp,
  Globe,
  Shield
} from 'lucide-react';
import { sampleEvents } from '../../data/events';
import { teamMembers } from '../../data/team';
import { useRef, useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const featuredEvents = sampleEvents.filter(event => event.featured).slice(0, 3);
  const coreTeam = teamMembers.filter(member => member.featured);

  const stats = [
    { icon: Users, label: 'Events Organized', value: '500+', color: 'text-drip-neon-teal' },
    { icon: Globe, label: 'Happy Attendees', value: '1M+', color: 'text-drip-warm-yellow' },
    { icon: Calendar, label: 'Years Experience', value: '12+', color: 'text-drip-deep-purple' },
    { icon: Award, label: 'Industry Awards', value: '25+', color: 'text-drip-neon-teal' }
  ];

  const services = [
    {
      title: 'Event Production',
      description: 'Full-scale event management from concept to execution with cutting-edge technology',
      icon: Music,
      features: ['Stage Design', '360° Planning', 'Live Streaming', 'VIP Management'],
      color: 'from-drip-neon-teal to-drip-neon-teal/60'
    },
    {
      title: 'Talent Booking',
      description: 'Exclusive access to top DJs and electronic artists worldwide',
      icon: Headphones,
      features: ['Global Network', 'Artist Management', 'Contract Negotiation', 'Tour Support'],
      color: 'from-drip-warm-yellow to-drip-warm-yellow/60'
    },
    {
      title: 'Venue Solutions', 
      description: 'Premium venues and custom infrastructure solutions',
      icon: Shield,
      features: ['Venue Sourcing', 'Safety Protocols', 'Crowd Management', 'Permit Handling'],
      color: 'from-drip-deep-purple to-drip-deep-purple/60'
    },
    {
      title: 'Audio Visual',
      description: 'State-of-the-art audio-visual production technology',
      icon: Volume2,
      features: ['Pro Audio Systems', 'LED Installations', 'Lighting Design', 'Recording'],
      color: 'from-drip-neon-teal to-drip-deep-purple'
    }
  ];

  const achievements = [
    { 
      title: "India's #1 Electronic Music Events",
      desc: "Leading event organizer in electronic music industry",
      icon: TrendingUp
    },
    {
      title: "International Recognition",
      desc: "Featured in global music industry publications",
      icon: Globe
    },
    {
      title: "Technology Innovation",
      desc: "Pioneering immersive event experiences",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <Hero onNavigate={onNavigate} />

      {/* Enhanced Stats Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-start via-drip-dark-start/95 to-drip-dark-end" />
        <div className="absolute inset-0 drip-noise opacity-20" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-drip-neon-teal/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-6 px-6 py-2">
              <Star className="w-4 h-4 mr-2" />
              Trusted by Industry Leaders
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Proven <span className="drip-text-gradient">Excellence</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Numbers that speak louder than words. Our track record of delivering 
              exceptional electronic music experiences across India.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="relative drip-glass rounded-2xl p-8 border border-drip-glass-border text-center group-hover:border-drip-neon-teal/30 transition-all duration-300">
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-drip-neon-teal/5 to-drip-warm-yellow/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-drip-neon-teal/20 to-drip-warm-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold drip-text-gradient mb-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-white/70 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Featured Events */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-end to-drip-dark-start" />
        
        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-drip-warm-yellow/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-drip-warm-yellow/10 text-drip-warm-yellow border border-drip-warm-yellow/20 mb-6 px-6 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              What's Next
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Featured <span className="text-drip-warm-yellow">Events</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the most anticipated electronic music experiences coming to India. 
              Immersive soundscapes, cutting-edge visuals, and unforgettable moments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <EventCard 
                  event={event} 
                  onClick={() => onNavigate('events')}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => onNavigate('events')}
              className="bg-gradient-to-r from-drip-warm-yellow to-drip-warm-yellow/80 hover:from-drip-warm-yellow/90 hover:to-drip-warm-yellow/70 text-drip-dark-start font-semibold px-8 py-4 text-lg group relative overflow-hidden"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-drip-neon-teal to-drip-warm-yellow"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Preview */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-start to-drip-dark-end" />
        <div className="absolute inset-0 drip-noise opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-drip-deep-purple/10 text-drip-deep-purple border border-drip-deep-purple/20 mb-6 px-6 py-2">
              <Zap className="w-4 h-4 mr-2" />
              What We Do
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="text-drip-deep-purple">Services</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive event solutions tailored for the electronic music industry. 
              From intimate club nights to massive festivals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => onNavigate('services')}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative drip-glass rounded-2xl p-8 border border-drip-glass-border group-hover:border-drip-neon-teal/30 transition-all duration-300 overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-drip-neon-teal/20 to-drip-warm-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <service.icon className="w-8 h-8 text-drip-neon-teal" />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-drip-neon-teal group-hover:translate-x-1 transition-all duration-300" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-drip-neon-teal transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          className="flex items-center text-sm text-white/60"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 + 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-drip-neon-teal rounded-full mr-3" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => onNavigate('services')}
              variant="outline"
              className="border-2 border-drip-deep-purple text-drip-deep-purple hover:bg-drip-deep-purple hover:text-white font-semibold px-8 py-4 text-lg group relative overflow-hidden"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-drip-deep-purple"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Preview */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-end to-drip-dark-start" />
        
        <motion.div
          className="absolute top-1/2 left-0 w-72 h-72 bg-drip-deep-purple/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-6 px-6 py-2">
              <Users className="w-4 h-4 mr-2" />
              Meet the Crew
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Core <span className="drip-text-gradient">Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The passionate professionals behind India's most memorable electronic music events. 
              Creativity meets expertise in every beat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {coreTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => onNavigate('team')}
              variant="outline" 
              className="border-2 border-drip-neon-teal text-drip-neon-teal hover:bg-drip-neon-teal hover:text-drip-dark-start font-semibold px-8 py-4 text-lg group relative overflow-hidden"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-drip-neon-teal"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                Meet Full Team
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-dark-start to-drip-dark-end" />
        <div className="absolute inset-0 drip-noise opacity-30" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="relative drip-glass rounded-3xl p-12 lg:p-16 border border-drip-glass-border overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-drip-neon-teal/5 via-drip-warm-yellow/5 to-drip-deep-purple/5"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to <span className="drip-text-gradient">Drop the Beat</span>?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Let's create an unforgettable electronic music experience together. 
                From intimate club nights to massive festivals, we sync your vision with reality 
                using cutting-edge technology and unmatched creativity.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 hover:from-drip-neon-teal/90 hover:to-drip-neon-teal/70 text-drip-dark-start font-semibold px-8 py-4 text-lg group relative overflow-hidden"
                  size="lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-drip-warm-yellow to-drip-neon-teal"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <Button
                  onClick={() => onNavigate('events')}
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white hover:text-drip-dark-start font-semibold px-8 py-4 text-lg group relative overflow-hidden"
                  size="lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Music className="mr-2 h-5 w-5" />
                    Browse Events
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}