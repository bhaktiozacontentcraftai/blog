export type BlogCategory = 'Business' | 'Career' | 'Productivity';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLinkSuggestion {
  targetSlug: string;
  title: string;
  context: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subsections?: {
    id: string;
    heading: string;
    content: string[];
    listItems?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: 'tip' | 'warning' | 'stat' | 'quote';
      text: string;
      source?: string;
    };
  }[];
  content?: string[];
  listItems?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'tip' | 'warning' | 'stat' | 'quote';
    text: string;
    source?: string;
  };
}

export interface ArticleSEO {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  suggestedSlug: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: BlogCategory;
  subCategory: string;
  readTime: string;
  publishDate: string;
  updatedDate: string;
  author: Author;
  featuredImage: string;
  imageAlt: string;
  imageConcept: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  introParagraphs: string[];
  sections: ArticleSection[];
  keyTakeaways: string[];
  conclusion: string;
  callToAction: string;
  faqs: FAQItem[];
  internalLinks: InternalLinkSuggestion[];
  seo: ArticleSEO;
}

export interface Comment {
  id: string;
  articleSlug: string;
  authorName: string;
  authorRole?: string;
  content: string;
  date: string;
  likes: number;
}
