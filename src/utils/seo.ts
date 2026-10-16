import { Article, BlogCategory } from '../types/blog';

export const SITE_CONFIG = {
  name: 'The Growth Desk',
  tagline: 'Practical Ideas for Business and Career Growth',
  canonicalOrigin: 'https://blog-kxz2.vercel.app',
  publisher: {
    name: 'The Growth Desk Editorial Board',
    url: 'https://blog-kxz2.vercel.app',
    logo: 'https://blog-kxz2.vercel.app/src/assets/images/hero-business-desk.webp'
  },
  defaultImage: 'https://blog-kxz2.vercel.app/src/assets/images/hero-business-desk.webp',
  authorList: [
    {
      name: 'Elena Rostova',
      role: 'Startup Strategist & Former Venture Operator',
      url: 'https://blog-kxz2.vercel.app/about'
    },
    {
      name: 'Marcus Vance',
      role: 'Executive Talent Advisor & Career Strategist',
      url: 'https://blog-kxz2.vercel.app/about'
    },
    {
      name: 'Priya Patel',
      role: 'Operations Consultant & Performance Coach',
      url: 'https://blog-kxz2.vercel.app/about'
    }
  ]
};

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  keywords?: string[];
  noindex?: boolean;
  schemas?: Record<string, unknown>[];
}

/**
 * Dynamically updates document metadata, OpenGraph, Twitter, canonical URL, and JSON-LD structured data.
 */
export function applyPageSeo(config: PageSeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Title Tag
  document.title = config.title;

  // Helper to get or create tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Meta Description
  setMetaTag('name', 'description', config.description);

  // 3. Robots
  const robotsValue = config.noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  setMetaTag('name', 'robots', robotsValue);

  // 4. Canonical URL
  const canonicalUrl = `${SITE_CONFIG.canonicalOrigin}${config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 5. OpenGraph Tags
  setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', config.ogType || 'website');
  
  const ogImage = config.ogImage 
    ? (config.ogImage.startsWith('http') ? config.ogImage : `${SITE_CONFIG.canonicalOrigin}${config.ogImage.startsWith('/') ? config.ogImage : `/${config.ogImage}`}`)
    : SITE_CONFIG.defaultImage;
  setMetaTag('property', 'og:image', ogImage);

  if (config.publishedTime) {
    setMetaTag('property', 'article:published_time', config.publishedTime);
  }
  if (config.modifiedTime) {
    setMetaTag('property', 'article:modified_time', config.modifiedTime);
  }
  if (config.authorName) {
    setMetaTag('property', 'article:author', config.authorName);
  }

  // 6. Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:image', ogImage);

  // 7. Keywords
  if (config.keywords && config.keywords.length > 0) {
    setMetaTag('name', 'keywords', config.keywords.join(', '));
  }

  // 8. JSON-LD Structured Data
  let scriptEl = document.getElementById('seo-jsonld-schema') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'seo-jsonld-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': config.schemas || [
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.canonicalOrigin}/#website`,
        'url': SITE_CONFIG.canonicalOrigin,
        'name': SITE_CONFIG.name,
        'description': SITE_CONFIG.tagline,
        'publisher': {
          '@type': 'Organization',
          'name': SITE_CONFIG.publisher.name,
          'url': SITE_CONFIG.publisher.url,
          'logo': SITE_CONFIG.publisher.logo
        }
      }
    ]
  };

  scriptEl.textContent = JSON.stringify(structuredData, null, 2);
}

/**
 * Generates Schema.org graph for a blog post
 */
export function buildArticleSchemas(article: Article): Record<string, unknown>[] {
  const canonicalUrl = `${SITE_CONFIG.canonicalOrigin}/${article.slug}`;
  const categoryUrl = `${SITE_CONFIG.canonicalOrigin}/category/${article.category.toLowerCase()}`;
  const imageUrl = article.featuredImage.startsWith('http') 
    ? article.featuredImage 
    : `${SITE_CONFIG.canonicalOrigin}${article.featuredImage}`;

  const schemas: Record<string, unknown>[] = [
    // 1. BlogPosting Schema
    {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}/#article`,
      'isPartOf': {
        '@type': 'Blog',
        '@id': `${SITE_CONFIG.canonicalOrigin}/#blog`,
        'name': SITE_CONFIG.name,
        'url': SITE_CONFIG.canonicalOrigin
      },
      'headline': article.title,
      'description': article.seo.metaDescription,
      'url': canonicalUrl,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'image': {
        '@type': 'ImageObject',
        'url': imageUrl,
        'caption': article.imageAlt
      },
      'datePublished': '2026-10-12T08:00:00+00:00',
      'dateModified': '2026-10-15T09:30:00+00:00',
      'inLanguage': 'en-US',
      'author': {
        '@type': 'Person',
        'name': article.author.name,
        'jobTitle': article.author.role,
        'description': article.author.bio,
        'url': `${SITE_CONFIG.canonicalOrigin}/about`
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_CONFIG.publisher.name,
        'url': SITE_CONFIG.publisher.url,
        'logo': {
          '@type': 'ImageObject',
          'url': SITE_CONFIG.publisher.logo
        }
      },
      'articleSection': article.category,
      'keywords': [article.seo.primaryKeyword, ...article.seo.secondaryKeywords].join(', '),
      'wordCount': 1850
    },

    // 2. BreadcrumbList Schema
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}/#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': SITE_CONFIG.canonicalOrigin
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': article.category,
          'item': categoryUrl
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': article.title,
          'item': canonicalUrl
        }
      ]
    }
  ];

  // 3. FAQPage Schema if article has FAQs
  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}/#faq`,
      'mainEntity': article.faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  return schemas;
}

/**
 * Category Page SEO Metadata and Schema generator
 */
export function getCategorySeo(category: BlogCategory) {
  const catLower = category.toLowerCase();
  const canonicalPath = `/category/${catLower}`;

  const categoryData: Record<BlogCategory, {
    title: string;
    description: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    headline: string;
  }> = {
    Business: {
      title: 'Business & Startup Strategies | The Growth Desk',
      description: 'Explore actionable business strategies and entrepreneurship guides. Learn capital efficiency, lean startup validation, and scalable business models.',
      primaryKeyword: 'business strategies',
      secondaryKeywords: ['entrepreneurship guides', 'startup growth'],
      headline: 'Entrepreneurship, Business Strategy & Small Business Growth'
    },
    Career: {
      title: 'Career Development & Job Search | The Growth Desk',
      description: 'Practical career development blueprints to accelerate your trajectory. Master interview preparation, resume formatting, and promotion strategies.',
      primaryKeyword: 'career development',
      secondaryKeywords: ['job search advice', 'interview preparation'],
      headline: 'Job Searching, Resumes, Interview Mastery & Career Trajectories'
    },
    Productivity: {
      title: 'Productivity & Leadership Insights | The Growth Desk',
      description: 'Master workplace productivity and leadership habits. Discover time management strategies, deep work systems, and effective team delegation frameworks.',
      primaryKeyword: 'workplace productivity',
      secondaryKeywords: ['time management strategies', 'executive focus'],
      headline: 'Time Management, Leadership Habits & Executive Efficiency'
    }
  };

  const current = categoryData[category];
  const canonicalUrl = `${SITE_CONFIG.canonicalOrigin}${canonicalPath}`;

  const schemas: Record<string, unknown>[] = [
    {
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}/#collection`,
      'name': current.title,
      'description': current.description,
      'url': canonicalUrl,
      'isPartOf': {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.canonicalOrigin}/#website`
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}/#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': SITE_CONFIG.canonicalOrigin
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': category,
          'item': canonicalUrl
        }
      ]
    }
  ];

  return {
    ...current,
    canonicalPath,
    schemas
  };
}
