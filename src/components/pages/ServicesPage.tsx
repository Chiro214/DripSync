'use client';

import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowRight, CheckCircle, Star, Zap, Headphones, Settings, Megaphone, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      id: 'production',
      icon: '🎪',
      title: 'Event Production',
      description: 'Full-scale event management from concept to execution',
      longDescription: 'We handle every aspect of your event production, from initial concept development to final execution. Our experienced team manages logistics, vendor coordination, timeline management, and on-site coordination to ensure flawless delivery.',
      features: [
        'Concept Development & Planning',
        'Vendor Management & Coordination',
        'Timeline & Project Management',
        'On-site Event Coordination',
        'Post-event Analysis & Reporting'
      ],
      caseStudy: {
        title: 'Neon Nights Festival 2024',
        description: 'Managed a 3-day festival for 15,000+ attendees across multiple stages',
        metrics: ['15,000+ Attendees', '3 Stages', '48 Artists', '99% Satisfaction']
      }
    },
    {
      id: 'talent',
      icon: '🎧',
      title: 'Talent Booking',
      description: 'Exclusive access to top DJs and electronic artists worldwide',
      longDescription: 'Our extensive network of international and domestic artists allows us to book the perfect talent for your event. From emerging underground artists to world-renowned headliners, we handle all negotiations and logistics.',
      features: [
        'International Artist Booking',
        'Domestic Talent Curation',
        'Artist Travel & Logistics',
        'Contract Negotiation',
        'Artist Hospitality Management'
      ],
      caseStudy: {
        title: 'Bass Drop Series',
        description: 'Booked 25+ international DJs across 12 events in 2024',
        metrics: ['25+ Artists', '12 Events', '8 Countries', '100% Success Rate']
      }
    },
    {
      id: 'venues',
      icon: '🏟️',
      title: 'Venue Management',
      description: 'Premium venues and custom stage design solutions',
      longDescription: 'We transform any space into an immersive electronic music experience. Our venue management includes site selection, custom stage design, crowd flow optimization, and complete venue transformation.',
      features: [
        'Venue Sourcing & Selection',
        'Custom Stage Design',
        'Crowd Flow Optimization',
        'Venue Transformation',
        'Compliance & Safety Management'
      ],
      caseStudy: {
        title: 'Underground Collective',
        description: 'Transformed warehouse spaces into premium electronic music venues',
        metrics: ['15 Venues', '50+ Events', '200% Capacity', 'Zero Incidents']
      }
    },
    {
      id: 'technology',
      icon: '🎛️',
      title: 'Sound & Lighting',
      description: 'State-of-the-art audio-visual production technology',
      longDescription: 'Our technical production team delivers world-class sound and lighting experiences. We use cutting-edge equipment and innovative design to create immersive audio-visual environments.',
      features: [
        'Professional Sound Systems',
        'Advanced Lighting Design',
        'LED Wall & Video Production',
        'Interactive Installations',
        '24/7 Technical Support'
      ],
      caseStudy: {
        title: 'Techno Transformation',
        description: 'Designed immersive 360° sound and lighting experience',
        metrics: ['360° Sound', '500+ Lights', '4K Visuals', 'Award Winning']
      }
    },
    {
      id: 'marketing',
      icon: '📱',
      title: 'Marketing & Promotion',
      description: 'Strategic marketing campaigns that create buzz and drive attendance',
      longDescription: 'Our marketing team creates comprehensive campaigns that build excitement and maximize attendance. From social media strategy to influencer partnerships and traditional advertising.',
      features: [
        'Social Media Strategy',
        'Influencer Partnerships',
        'Content Creation',
        'Digital Advertising',
        'PR & Media Relations'
      ],
      caseStudy: {
        title: 'Progressive Pulse Campaign',
        description: 'Generated 2M+ social impressions and sold out in 48 hours',
        metrics: ['2M+ Impressions', '48hrs Sellout', '50+ Influencers', '300% ROI']
      }
    },
    {
      id: 'logistics',
      icon: '🚛',
      title: 'Logistics & Operations',
      description: 'Seamless coordination of all event logistics and operations',
      longDescription: 'Behind every successful event is meticulous logistics planning. We handle everything from equipment transportation to staff coordination, ensuring smooth operations.',
      features: [
        'Equipment Transportation',
        'Staff Coordination',
        'Security Management',
        'Catering Services',
        'Emergency Protocols'
      ],
      caseStudy: {
        title: 'Multi-City Tour',
        description: 'Coordinated logistics for 10-city electronic music tour',
        metrics: ['10 Cities', '20 Trucks', '200+ Crew', 'Zero Delays']
      }
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We understand your vision, goals, and requirements through detailed consultation.'
    },
    {
      step: '02', 
      title: 'Planning',
      description: 'Comprehensive planning phase covering all aspects of your event experience.'
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Flawless execution with real-time monitoring and adaptive management.'
    },
    {
      step: '04',
      title: 'Analysis',
      description: 'Post-event analysis and insights for continuous improvement and future planning.'
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
          <Badge className="bg-drip-deep-purple/10 text-drip-deep-purple border border-drip-deep-purple/20 mb-4">
            What We Do
          </Badge>
          <h1 className="text-white mb-4">Our Services</h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Comprehensive event solutions tailored for the electronic music industry. 
            From intimate club nights to massive festivals, we handle every detail.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-16 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">{service.title}</h2>
                    <p className="text-drip-neon-teal font-medium">{service.description}</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed">{service.longDescription}</p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-drip-neon-teal" />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Case Study */}
                <div className="drip-glass rounded-lg p-6 border border-drip-glass-border">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-drip-warm-yellow" />
                    Case Study: {service.caseStudy.title}
                  </h4>
                  <p className="text-white/70 text-sm mb-4">{service.caseStudy.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {service.caseStudy.metrics.map((metric) => (
                      <Badge key={metric} className="bg-drip-neon-teal/10 text-drip-neon-teal border-drip-neon-teal/20">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-xl overflow-hidden drip-glass border border-drip-glass-border">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTcxMDg1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt={service.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-drip-dark-start/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-drip-deep-purple text-white">
                      {service.title}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-4">
              Our Process
            </Badge>
            <h2 className="text-3xl font-semibold text-white mb-4">How We Work</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our proven 4-step process ensures every event exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="drip-glass rounded-xl p-6 border border-drip-glass-border text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl font-bold drip-text-gradient mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
                
                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-drip-neon-teal to-drip-warm-yellow" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="drip-glass rounded-2xl p-8 md:p-12 border border-drip-glass-border text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Zap className="w-16 h-16 text-drip-neon-teal mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Ready to Create Something Epic?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and create an unforgettable electronic music experience together. 
            From concept to execution, we're here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              className="bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start drip-glow group"
              size="lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => onNavigate('events')}
              variant="outline"
              className="border-2 border-drip-warm-yellow text-drip-warm-yellow hover:bg-drip-warm-yellow hover:text-drip-dark-start"
              size="lg"
            >
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}