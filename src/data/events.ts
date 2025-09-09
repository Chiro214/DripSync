import { Event } from '../components/EventCard';

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Nights: Electronic Odyssey',
    date: 'March 15, 2025',
    time: '9:00 PM',
    venue: 'Phoenix MarketCity',
    city: 'Mumbai',
    genre: 'Electronic',
    capacity: 5000,
    price: '₹2,500 onwards',
    image: 'https://images.unsplash.com/photo-1708544484827-fe564ee329ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBldmVudCUyMHBvc3RlciUyMG5lb258ZW58MXx8fHwxNzU3MTA4NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    status: 'selling'
  },
  {
    id: '2',
    title: 'Bass Drop Festival 2025',
    date: 'March 28, 2025',
    time: '7:00 PM',
    venue: 'DLF CyberHub',
    city: 'Gurugram',
    genre: 'Bass',
    capacity: 3500,
    price: '₹1,800 onwards',
    image: 'https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTcxMDg1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'selling'
  },
  {
    id: '3',
    title: 'Techno Transformation',
    date: 'April 12, 2025',
    time: '10:00 PM',
    venue: 'Bangalore Palace Grounds',
    city: 'Bangalore',
    genre: 'Techno',
    capacity: 7500,
    price: '₹3,200 onwards',
    image: 'https://images.unsplash.com/photo-1574155331040-87b9dae81218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBmZXN0aXZhbCUyMGNyb3dkJTIwbGlnaHRzfGVufDF8fHx8MTc1NzEwODUwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Progressive Pulse',
    date: 'April 25, 2025',
    time: '8:30 PM',
    venue: 'Hyderabad International Convention Centre',
    city: 'Hyderabad',
    genre: 'Progressive',
    capacity: 4200,
    price: '₹2,100 onwards',
    image: 'https://images.unsplash.com/photo-1680907899793-08419dc6f4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG1peGluZyUyMGVsZWN0cm9uaWMlMjBtdXNpYyUyMG5pZ2h0fGVufDF8fHx8MTc1NzEwODUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'selling'
  },
  {
    id: '5',
    title: 'Sunset Soundscapes',
    date: 'May 8, 2025',
    time: '6:00 PM',
    venue: 'Puducherry Beach Resort',
    city: 'Puducherry',
    genre: 'Ambient',
    capacity: 1500,
    price: '₹4,500 onwards',
    image: 'https://images.unsplash.com/photo-1708544484827-fe564ee329ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBldmVudCUyMHBvc3RlciUyMG5lb258ZW58MXx8fHwxNzU3MTA4NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'upcoming'
  },
  {
    id: '6',
    title: 'Underground Collective',
    date: 'May 20, 2025',
    time: '11:00 PM',
    venue: 'Kolkata Creative Hub',
    city: 'Kolkata',
    genre: 'Underground',
    capacity: 2000,
    price: '₹1,200 onwards',
    image: 'https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTcxMDg1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'sold-out'
  }
];

export const eventGenres = [
  'All',
  'Electronic',
  'Techno', 
  'Bass',
  'Progressive',
  'Ambient',
  'Underground'
];

export const eventCities = [
  'All Cities',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Kolkata',
  'Chennai',
  'Pune',
  'Gurugram',
  'Puducherry'
];