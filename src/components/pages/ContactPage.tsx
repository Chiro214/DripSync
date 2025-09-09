'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      budget: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@dripsync.in', 'bookings@dripsync.in'],
      description: 'Send us a message anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Available 24/7 for urgent inquiries'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['DripSync HQ', 'Sector 44, Gurugram', 'Haryana 122003'],
      description: 'Our creative studio and office'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon-Fri: 10:00 - 20:00', 'Sat: 11:00 - 18:00', 'Sun: Closed'],
      description: 'Events may extend hours'
    }
  ];

  const eventTypes = [
    'Club Night',
    'Festival',
    'Private Party',
    'Corporate Event',
    'Product Launch',
    'Wedding',
    'Concert',
    'Other'
  ];

  const budgetRanges = [
    'Under ₹5 Lakhs',
    '₹5-15 Lakhs',
    '₹15-50 Lakhs',
    '₹50 Lakhs - ₹1 Crore',
    'Above ₹1 Crore',
    'Let\'s Discuss'
  ];

  const faqs = [
    {
      question: 'What types of events do you organize?',
      answer: 'We specialize in electronic music events including club nights, festivals, concerts, private parties, corporate events, and product launches. Our expertise covers everything from intimate 100-person gatherings to massive 50,000+ festivals.'
    },
    {
      question: 'How far in advance should we book?',
      answer: 'For best results, we recommend booking 3-6 months in advance for major events and 4-8 weeks for smaller gatherings. However, we can accommodate shorter timelines for urgent projects.'
    },
    {
      question: 'Do you handle international artist bookings?',
      answer: 'Yes! We have extensive connections with international DJs and artists. We handle all aspects including negotiations, visas, travel arrangements, and hospitality management.'
    },
    {
      question: 'What\'s included in your event production service?',
      answer: 'Our full production service includes venue sourcing, stage design, sound & lighting, artist booking, marketing, security, catering, and complete event management from concept to execution.'
    },
    {
      question: 'Can you work within our budget?',
      answer: 'Absolutely! We create customized solutions for various budget ranges. During consultation, we\'ll discuss your requirements and propose the best approach to maximize impact within your budget.'
    },
    {
      question: 'Do you provide services outside major cities?',
      answer: 'Yes, we organize events across India. While we\'re based in Gurugram, we have successfully executed events in tier-2 and tier-3 cities as well as remote locations.'
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
          <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-4">
            Get In Touch
          </Badge>
          <h1 className="text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Ready to create an unforgettable electronic music experience? 
            Let's discuss your vision and make it reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="drip-glass border-drip-glass-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-drip-neon-teal" />
                  Book Your Event
                </CardTitle>
                <p className="text-white/70">Tell us about your event requirements</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-drip-glass border-drip-glass-border text-white"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-drip-glass border-drip-glass-border text-white"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-drip-glass border-drip-glass-border text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventType" className="text-white">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)} required>
                        <SelectTrigger className="bg-drip-glass border-drip-glass-border text-white">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="eventDate" className="text-white">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        className="bg-drip-glass border-drip-glass-border text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-white">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-drip-glass border-drip-glass-border text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map(budget => (
                          <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-drip-glass border-drip-glass-border text-white min-h-32"
                      placeholder="Tell us about your event vision, requirements, and any specific details..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start drip-glow group"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="drip-glass rounded-xl p-6 border border-drip-glass-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-drip-neon-teal/10 rounded-lg">
                    <info.icon className="w-6 h-6 text-drip-neon-teal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{info.description}</p>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-white/80 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick Contact */}
            <motion.div
              className="drip-glass rounded-xl p-6 border border-drip-glass-border text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">Need Immediate Assistance?</h3>
              <p className="text-white/70 text-sm mb-4">
                For urgent inquiries, call our 24/7 event hotline
              </p>
              <Button
                variant="outline"
                className="border-2 border-drip-warm-yellow text-drip-warm-yellow hover:bg-drip-warm-yellow hover:text-drip-dark-start"
                size="lg"
              >
                <Phone className="mr-2 h-4 w-4" />
                +91 98765 43210
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-drip-deep-purple/10 text-drip-deep-purple border border-drip-deep-purple/20 mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about our services and event planning process
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="drip-glass rounded-lg border border-drip-glass-border px-6"
                >
                  <AccordionTrigger className="text-white hover:text-drip-neon-teal text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
}