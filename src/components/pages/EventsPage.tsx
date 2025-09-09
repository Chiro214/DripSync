'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { EventCard } from '../EventCard';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { sampleEvents, eventGenres, eventCities } from '../../data/events';

interface EventsPageProps {
  onNavigate: (page: string) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || event.genre === selectedGenre;
      const matchesCity = selectedCity === 'All Cities' || event.city === selectedCity;
      const matchesStatus = selectedStatus === 'All Status' || event.status === selectedStatus;

      return matchesSearch && matchesGenre && matchesCity && matchesStatus;
    });
  }, [searchQuery, selectedGenre, selectedCity, selectedStatus]);

  const statusOptions = ['All Status', 'upcoming', 'selling', 'sold-out'];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-drip-neon-teal/10 text-drip-neon-teal border border-drip-neon-teal/20 mb-4">
            Upcoming Events
          </Badge>
          <h1 className="text-white mb-4">Future Events</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the hottest electronic music events across India. 
            From underground techno to massive EDM festivals.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="drip-glass rounded-xl p-6 border border-drip-glass-border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search events, venues, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-drip-glass border-drip-glass-border text-white placeholder:text-white/50"
              />
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-drip-glass border-drip-glass-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="bg-drip-glass border-drip-glass-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-drip-glass border-drip-glass-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'All Status' ? status : 
                     status === 'upcoming' ? 'Coming Soon' :
                     status === 'selling' ? 'On Sale' : 'Sold Out'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-drip-glass-border">
            <p className="text-white/70 text-sm">
              Showing {filteredEvents.length} of {sampleEvents.length} events
            </p>
            
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-drip-neon-teal text-drip-dark-start' : 'border-drip-glass-border text-white'}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-drip-neon-teal text-drip-dark-start' : 'border-drip-glass-border text-white'}
              >
                List
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard 
                  event={event} 
                  onClick={() => {
                    // Handle event details
                    console.log('Event clicked:', event.title);
                  }}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="drip-glass rounded-xl p-12 border border-drip-glass-border max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-drip-neon-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
              <p className="text-white/70 mb-6">
                Try adjusting your filters or search criteria to find more events.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('All');
                  setSelectedCity('All Cities');
                  setSelectedStatus('All Status');
                }}
                className="bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredEvents.length > 0 && filteredEvents.length >= 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="outline"
              className="border-2 border-drip-warm-yellow text-drip-warm-yellow hover:bg-drip-warm-yellow hover:text-drip-dark-start"
              size="lg"
            >
              Load More Events
            </Button>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          className="mt-20 drip-glass rounded-2xl p-8 border border-drip-glass-border text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Stay in the Loop</h3>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Get notified about new events, early bird tickets, and exclusive access to VIP experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-drip-glass border-drip-glass-border text-white placeholder:text-white/50"
            />
            <Button className="bg-drip-neon-teal hover:bg-drip-neon-teal/90 text-drip-dark-start drip-glow">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}