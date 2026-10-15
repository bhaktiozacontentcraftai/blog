import { Author } from '../types/blog';

export const AUTHORS: Record<string, Author> = {
  elena: {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Startup Strategist & Former Venture Operator',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80',
    bio: 'Elena has advised over 120 early-stage ventures and bootstrapped two profitable B2B service firms. She writes on capital efficiency, lean validation, and scalable business fundamentals.'
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Executive Talent Advisor & Career Strategist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
    bio: 'Former senior recruiter at Fortune 100 technology and financial organizations. Marcus specializes in high-impact resume positioning, executive compensation negotiation, and 90-day trajectory shifts.'
  },
  priya: {
    id: 'priya',
    name: 'Priya Patel',
    role: 'Operations Consultant & Performance Coach',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80',
    bio: 'Priya designs high-efficiency operating systems for remote leaders and high-output teams. Her frameworks on time blocking and executive focus have been adopted across top consulting practices.'
  }
};
