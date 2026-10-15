import { Article, BlogCategory, Comment } from '../types/blog';
import { ARTICLES_PART_1 } from './articlesPart1';
import { ARTICLES_PART_2 } from './articlesPart2';
import { ARTICLES_PART_3 } from './articlesPart3';

export const ALL_ARTICLES: Article[] = [
  ...ARTICLES_PART_1,
  ...ARTICLES_PART_2,
  ...ARTICLES_PART_3,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find(
    (a) => a.slug.toLowerCase() === slug.toLowerCase() || a.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getArticlesByCategory(category: BlogCategory | 'All'): Article[] {
  if (category === 'All') return ALL_ARTICLES;
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(currentId: string, limit: number = 3): Article[] {
  const current = ALL_ARTICLES.find((a) => a.id === currentId);
  if (!current) return ALL_ARTICLES.slice(0, limit);

  // Match by category and shared tags
  return ALL_ARTICLES
    .filter((a) => a.id !== currentId)
    .sort((a, b) => {
      const aMatchesCategory = a.category === current.category ? 2 : 0;
      const bMatchesCategory = b.category === current.category ? 2 : 0;
      const aMatchesTags = a.tags.filter((t) => current.tags.includes(t)).length;
      const bMatchesTags = b.tags.filter((t) => current.tags.includes(t)).length;
      return (bMatchesCategory + bMatchesTags) - (aMatchesCategory + aMatchesTags);
    })
    .slice(0, limit);
}

export function searchArticles(query: string, category?: string): Article[] {
  const cleanQuery = query.toLowerCase().trim();
  return ALL_ARTICLES.filter((article) => {
    const matchesCategory = !category || category === 'All' || article.category === category;
    if (!cleanQuery) return matchesCategory;

    const inTitle = article.title.toLowerCase().includes(cleanQuery);
    const inSubtitle = article.subtitle.toLowerCase().includes(cleanQuery);
    const inExcerpt = article.excerpt.toLowerCase().includes(cleanQuery);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(cleanQuery));
    const inAuthor = article.author.name.toLowerCase().includes(cleanQuery);
    const inKeywords = article.seo.secondaryKeywords.some((k) => k.toLowerCase().includes(cleanQuery));

    return matchesCategory && (inTitle || inSubtitle || inExcerpt || inTags || inAuthor || inKeywords);
  });
}

// Initial realistic reader comments
export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    articleSlug: 'how-to-start-a-small-business-with-little-money',
    authorName: 'David K., Freelance Consultant',
    authorRole: 'Founder @ NorthStar Ops',
    content: 'The section on pre-sale validation is golden. I spent $4,000 on branding for my first venture that made zero sales. On my second, I closed $6,500 in service retainers from a 1-page Notion memo before even choosing a logo.',
    date: 'October 13, 2026',
    likes: 18
  },
  {
    id: 'c2',
    articleSlug: 'how-to-start-a-small-business-with-little-money',
    authorName: 'Sophia Lin',
    authorRole: 'Aspiring Entrepreneur',
    content: 'Quick question: How do you handle clients who ask for enterprise payment terms like Net-90 when you are just starting out?',
    date: 'October 14, 2026',
    likes: 7
  },
  {
    id: 'c3',
    articleSlug: 'how-to-write-a-resume-that-gets-you-noticed',
    authorName: 'Alex Rivera',
    authorRole: 'Senior Product Manager',
    content: 'Swapping my responsibilities into the XYZ formula directly resulted in two recruiter screen invitations this week after a month of crickets. The 6-second scan rule is real.',
    date: 'October 12, 2026',
    likes: 24
  },
  {
    id: 'c4',
    articleSlug: '15-common-job-interview-questions-and-how-to-answer-them',
    authorName: 'Rachel Green',
    authorRole: 'Operations Analyst',
    content: 'Question 15 (asking the interviewer about 6-month obstacles) completely shifted the energy of my final round interview yesterday. The VP immediately leaned forward and spoke for 10 minutes like we were already team members.',
    date: 'October 11, 2026',
    likes: 31
  },
  {
    id: 'c5',
    articleSlug: 'time-management-strategies-for-busy-professionals',
    authorName: 'Carlos M.',
    authorRole: 'Director of Engineering',
    content: 'The morning 3-hour Focus Block before checking Slack is life changing. My sprint throughput is up nearly 35% without working late evenings anymore.',
    date: 'October 10, 2026',
    likes: 15
  }
];
