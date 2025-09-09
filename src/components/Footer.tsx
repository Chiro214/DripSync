'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Heart,
  Send,
  Globe,
  Clock,
  Star,
  ArrowUp
} from 'lucide-react';
import { useRef, useState } from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const footerSections = [
    {
      title: 'Services',
      icon: Globe,
      links: [
        { label: 'Event Production', page: 'services' },
        { label: 'Talent Booking', page: 'services' },
        { label: 'Venue Management', page: 'services' },
        { label: 'Sound & Lighting', page: 'services' },
        { label: 'Marketing Solutions', page: 'services' }
      ]
    },
    {
      title: 'Company',
      icon: Star,
      links: [
        { label: 'About Us', page: 'team' },
        { label: 'Our Team', page: 'team' },
        { label: 'Careers', page: 'contact' },
        { label: 'Press Kit', page: 'contact' },
        { label: 'Partners', page: 'contact' }
      ]
    },
    {
      title: 'Events',
      icon: Clock,
      links: [
        { label: 'Upcoming Events', page: 'events' },
        { label: 'Past Events', page: 'events' },
        { label: 'Private Bookings', page: 'contact' },
        { label: 'Corporate Events', page: 'contact' },
        { label: 'Festivals', page: 'events' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-600' },
    { icon: Youtube, label: 'YouTube', url: '#', color: 'hover:text-red-500' }
  ];

  const achievements = [
    { label: '500+ Events', value: '500+' },
    { label: 'Happy Attendees', value: '1M+' },
    { label: 'Years Experience', value: '12+' },
    { label: 'Industry Awards', value: '25+' }
  ];

  return (
    <footer className="relative mt-24 overflow-hidden" ref={footerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-drip-dark-end via-drip-dark-start to-drip-dark-start" />
      <div className="absolute inset-0 drip-noise opacity-40" />
      
      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-drip-neon-teal/5 rounded-full blur-3xl"
        style={{ y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-drip-warm-yellow/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Newsletter Section */}
      <motion.div
        className="relative px-6 py-20 mb-16"
        style={{ opacity }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="relative drip-glass rounded-3xl p-12 lg:p-16 border border-drip-glass-border overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-drip-neon-teal/5 via-drip-warm-yellow/5 to-drip-deep-purple/5"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(0,212,170,0.05), rgba(245,158,11,0.05), rgba(107,70,193,0.05))',
                  'linear-gradient(135deg, rgba(107,70,193,0.05), rgba(0,212,170,0.05), rgba(245,158,11,0.05))',
                  'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(107,70,193,0.05), rgba(0,212,170,0.05))'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-6 px-6 py-2 text-sm">
                  <Send className="w-4 h-4 mr-2" />
                  Stay Connected
                </Badge>
              </motion.div>
              
              <motion.h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Never Miss a <span className="drip-text-gradient">Beat</span>
              </motion.h3>
              
              <motion.p 
                className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Subscribe to our newsletter for exclusive event updates, early bird tickets, 
                and behind-the-scenes content from India's electronic music scene.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Input
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-drip-glass border-drip-glass-border text-white placeholder:text-white/50 flex-1 h-12 px-4 rounded-xl focus:border-drip-neon-teal"
                />
                <Button 
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className="bg-gradient-to-r from-drip-neon-teal to-drip-neon-teal/80 hover:from-drip-neon-teal/90 hover:to-drip-neon-teal/70 text-drip-dark-start font-semibold px-8 h-12 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-drip-warm-yellow to-drip-neon-teal"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    {isSubscribed ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mr-2"
                        >
                          ✓
                        </motion.div>
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
              
              <motion.p 
                className="text-white/50 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                No spam, unsubscribe anytime. We respect your privacy.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Achievement Stats */}
      <motion.div
        className="relative px-6 py-16 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="text-center drip-glass rounded-2xl p-6 border border-drip-glass-border group hover:border-drip-neon-teal/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.h4 
                  className="text-2xl md:text-3xl font-bold drip-text-gradient mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  {achievement.value}
                </motion.h4>
                <p className="text-white/70 text-sm font-medium">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="relative drip-glass border-t border-drip-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h3 
                  className="text-3xl font-bold drip-text-gradient mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  DripSync
                </motion.h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  India's premier event organizing company specializing in electronic music experiences. 
                  We sync music, technology, and unforgettable moments to create events that resonate 
                  long after the last beat drops.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  { icon: Mail, text: 'hello@dripsync.in', type: 'email' },
                  { icon: Phone, text: '+91 98765 43210', type: 'phone' },
                  { icon: MapPin, text: 'Sector 44, Gurugram, Haryana', type: 'address' }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.type}
                    className="flex items-center gap-4 text-white/70 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-drip-neon-teal/10 flex items-center justify-center group-hover:bg-drip-neon-teal/20 transition-colors">
                      <contact.icon className="w-5 h-5 text-drip-neon-teal" />
                    </div>
                    <span className="group-hover:text-white transition-colors">{contact.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.label}
                    className={`p-3 drip-glass rounded-xl border border-drip-glass-border text-white/70 ${social.color} hover:border-drip-neon-teal/50 transition-all duration-300 group relative overflow-hidden`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-drip-neon-teal/10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <social.icon className="w-5 h-5 relative z-10" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Footer Navigation Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-drip-neon-teal/10 flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-drip-neon-teal" />
                  </div>
                  <h4 className="font-semibold text-white text-lg">{section.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        onClick={() => onNavigate(link.page)}
                        className="text-white/70 hover:text-drip-neon-teal transition-all duration-200 text-sm flex items-center group"
                        whileHover={{ x: 4 }}
                      >
                        <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        {link.label}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <Separator className="bg-gradient-to-r from-drip-neon-teal/20 via-drip-warm-yellow/20 to-drip-deep-purple/20 mb-8" />

          {/* Bottom Footer */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>© {currentYear} DripSync. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span>for the electronic music community in India.</span>
            </div>
            
            <div className="flex items-center gap-8 text-white/50 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
                <motion.button
                  key={policy}
                  className="hover:text-drip-neon-teal transition-colors relative group"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {policy}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-drip-neon-teal group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Scroll to Top Button */}
          <motion.button
            className="fixed bottom-8 right-8 p-4 drip-glass rounded-full border border-drip-neon-teal/30 text-drip-neon-teal hover:bg-drip-neon-teal hover:text-drip-dark-start transition-all z-50 group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            transition={{ delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-drip-neon-teal rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}