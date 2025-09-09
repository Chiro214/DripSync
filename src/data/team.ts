export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    spotify?: string;
  };
  featured?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Chirag Shukla',
    role: 'Founder & Creative Director',
    bio: 'Visionary behind DripSync with 12+ years in event management. Pioneer of India\'s electronic music scene.',
    image: '/src/styles/chirag.jpg',
    skills: ['Event Strategy', 'Artist Relations', 'Brand Partnerships', 'Creative Vision'],
    social: {
      twitter: '@arjunmehta_ds',
      instagram: '@arjunmehta.official',
      linkedin: 'arjun-mehta-dripsync'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Priyam Arneja',
    role: 'Co-Founder & Head of Production',
    bio: 'Technical mastermind ensuring flawless execution of every event. Expert in stage design and audio engineering.',
    image: '/src/styles/Priyam.jpg',
    skills: ['Stage Design', 'Audio Engineering', 'Logistics', 'Safety Management'],
    social: {
      instagram: '@priya.production',
      linkedin: 'priya-sharma-events'
    },
    featured: true
  },
  {
    id: '3',
    name: 'Alankrita Das',
    role: 'Co-founder & Talent Curator',
    bio: 'Discovering and booking the hottest DJs and artists. Deep connections in the global electronic music network.',
    image: '/src/styles/Alankrita.jpg',
    skills: ['Artist Booking', 'Music Curation', 'International Relations', 'Trend Analysis'],
    social: {
      twitter: '@karansingh_music',
      instagram: '@karan.curator',
      spotify: 'karan-singh-playlists'
    }
  },
  {
    id: '4',
    name: 'Mansi Chorwade',
    role: 'Experience Designer',
    bio: 'Creating immersive environments that blend technology with human emotion. Masters in interactive installations.',
    image: 'https://images.unsplash.com/photo-1627845627805-404ce847c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3MTA4NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['UX Design', 'Interactive Tech', 'Visual Arts', '3D Modeling'],
    social: {
      instagram: '@maya.designs',
      linkedin: 'maya-patel-designer'
    }
  },
  {
    id: '5',
    name: 'DeltaOrbit',
    role: 'Marketing Strategist',
    bio: 'Digital marketing wizard who creates viral campaigns. Expert in social media and influencer partnerships.',
    image: '/src/styles/delta.png',
    skills: ['Digital Marketing', 'Social Media', 'Brand Strategy', 'Analytics'],
    social: {
      twitter: '@rohitgupta_mk',
      instagram: '@rohit.marketing',
      linkedin: 'rohit-gupta-marketing'
    }
  },
  {
    id: '6',
    name: 'Aman Singh',
    role: 'Operations Manager',
    bio: 'The backbone of DripSync operations. Ensures seamless coordination across all departments and events.',
    image: 'src/styles/aman.JPG',
    skills: ['Operations', 'Project Management', 'Team Leadership', 'Process Optimization'],
    social: {
      linkedin: 'aman-singh-operations',
      instagram: '@aman.operations'
    }
  }
];