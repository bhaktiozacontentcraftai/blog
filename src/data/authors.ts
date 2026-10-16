import { Author } from '../types/blog';

export const AUTHORS: Record<string, Author> = {
  elena: {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Startup Strategist & Former Venture Operator',
    avatar: '/src/assets/images/author-elena.webp',
    bio: 'Elena has advised over 120 early-stage ventures and bootstrapped two profitable B2B service firms. She writes on capital efficiency, lean validation, and scalable business fundamentals.'
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Executive Talent Advisor & Career Strategist',
    avatar: '/src/assets/images/author-marcus.webp',
    bio: 'Former senior recruiter at Fortune 100 technology and financial organizations. Marcus specializes in high-impact resume positioning, executive compensation negotiation, and 90-day trajectory shifts.'
  },
  priya: {
    id: 'priya',
    name: 'Priya Patel',
    role: 'Operations Consultant & Performance Coach',
    avatar: '/src/assets/images/author-priya.webp',
    bio: 'Priya designs high-efficiency operating systems for remote leaders and high-output teams. Her frameworks on time blocking and executive focus have been adopted across top consulting practices.'
  }
};
