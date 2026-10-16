import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SavedArticlesPage } from './pages/SavedArticlesPage';
import { CareerToolkit } from './components/CareerToolkit';
import { SearchModal } from './components/SearchModal';
import { NewsletterModal } from './components/NewsletterModal';
import { ALL_ARTICLES, getArticleBySlug } from './data/articles';
import { BlogCategory } from './types/blog';
import { applyPageSeo, buildArticleSchemas, getCategorySeo, SITE_CONFIG } from './utils/seo';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentCategory, setCurrentCategory] = useState<BlogCategory>('Business');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string>('how-to-start-small-business');
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // Initialize bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('the_growth_desk_bookmarks');
      if (stored) {
        setBookmarkedSlugs(JSON.parse(stored));
      } else {
        const defaultSaves = [
          'how-to-start-small-business',
          'job-interview-questions-and-answers',
        ];
        setBookmarkedSlugs(defaultSaves);
        localStorage.setItem('the_growth_desk_bookmarks', JSON.stringify(defaultSaves));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Parse path and hash to determine view and params
  const parseCurrentUrl = useCallback(() => {
    // 1. Check pathname first (e.g. /how-to-start-small-business or /category/business)
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash.replace(/^#\/?/, '');

    // Check pathname
    if (pathname.startsWith('/article/')) {
      const slug = pathname.replace('/article/', '').split('/')[0];
      const matched = getArticleBySlug(slug);
      if (matched) {
        setCurrentArticleSlug(matched.slug);
        setCurrentView('article');
        try {
          window.history.replaceState(null, '', `/${matched.slug}`);
        } catch {
          // Ignore
        }
        return;
      }
    } else if (pathname.startsWith('/category/')) {
      const rawCat = pathname.replace('/category/', '').split('/')[0].toLowerCase();
      const catMap: Record<string, BlogCategory> = {
        business: 'Business',
        career: 'Career',
        productivity: 'Productivity'
      };
      if (catMap[rawCat]) {
        setCurrentCategory(catMap[rawCat]);
        setCurrentView('category');
        return;
      }
    } else if (pathname === '/about') {
      setCurrentView('about');
      return;
    } else if (pathname === '/contact') {
      setCurrentView('contact');
      return;
    } else if (pathname === '/privacy') {
      setCurrentView('privacy');
      return;
    } else if (pathname === '/saved') {
      setCurrentView('saved');
      return;
    } else if (pathname === '/toolkit') {
      setCurrentView('toolkit');
      return;
    } else if (pathname !== '/') {
      const slug = pathname.replace(/^\//, '').split('/')[0];
      const matched = getArticleBySlug(slug);
      if (matched) {
        setCurrentArticleSlug(matched.slug);
        setCurrentView('article');
        if (slug !== matched.slug) {
          try {
            window.history.replaceState(null, '', `/${matched.slug}`);
          } catch {
            // Ignore
          }
        }
        return;
      }
    }

    // 2. Check hash fallback if pathname was root or matched nothing
    if (hash) {
      if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '').split('/')[0];
        const matched = getArticleBySlug(slug);
        if (matched) {
          setCurrentArticleSlug(matched.slug);
          setCurrentView('article');
          return;
        }
      } else if (hash.startsWith('category/')) {
        const rawCat = hash.replace('category/', '').split('/')[0].toLowerCase();
        const catMap: Record<string, BlogCategory> = {
          business: 'Business',
          career: 'Career',
          productivity: 'Productivity'
        };
        if (catMap[rawCat]) {
          setCurrentCategory(catMap[rawCat]);
          setCurrentView('category');
          return;
        }
      } else if (['about', 'contact', 'privacy', 'saved', 'toolkit'].includes(hash)) {
        setCurrentView(hash);
        return;
      } else {
        const matched = getArticleBySlug(hash);
        if (matched) {
          setCurrentArticleSlug(matched.slug);
          setCurrentView('article');
          return;
        }
      }
    }

    // Default to home
    setCurrentView('home');
  }, []);

  // Sync with browser navigation (popstate & hashchange)
  useEffect(() => {
    parseCurrentUrl();
    window.addEventListener('popstate', parseCurrentUrl);
    window.addEventListener('hashchange', parseCurrentUrl);
    return () => {
      window.removeEventListener('popstate', parseCurrentUrl);
      window.removeEventListener('hashchange', parseCurrentUrl);
    };
  }, [parseCurrentUrl]);

  // Keyboard shortcut ⌘K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update dynamic document SEO & Schema on every view change
  useEffect(() => {
    if (currentView === 'home') {
      applyPageSeo({
        title: 'The Growth Desk – Ideas for Business & Career Growth',
        description: 'Practical, actionable ideas on entrepreneurship, career advancement, interview preparation, resumes, and executive workplace productivity.',
        canonicalPath: '/',
        keywords: ['business and career growth', 'professional development', 'practical career strategies'],
        schemas: [
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
          },
          {
            '@type': 'Blog',
            '@id': `${SITE_CONFIG.canonicalOrigin}/#blog`,
            'name': SITE_CONFIG.name,
            'description': SITE_CONFIG.tagline,
            'url': SITE_CONFIG.canonicalOrigin
          }
        ]
      });
    } else if (currentView === 'article') {
      const art = getArticleBySlug(currentArticleSlug) || ALL_ARTICLES[0];
      applyPageSeo({
        title: art.seo.metaTitle,
        description: art.seo.metaDescription,
        canonicalPath: `/${art.slug}`,
        ogType: 'article',
        ogImage: art.featuredImage,
        publishedTime: '2026-10-12T08:00:00+00:00',
        modifiedTime: '2026-10-15T09:30:00+00:00',
        authorName: art.author.name,
        keywords: [art.seo.primaryKeyword, ...art.seo.secondaryKeywords],
        schemas: buildArticleSchemas(art)
      });
    } else if (currentView === 'category') {
      const catSeo = getCategorySeo(currentCategory);
      applyPageSeo({
        title: catSeo.title,
        description: catSeo.description,
        canonicalPath: catSeo.canonicalPath,
        keywords: [catSeo.primaryKeyword, ...catSeo.secondaryKeywords],
        schemas: catSeo.schemas
      });
    } else if (currentView === 'about') {
      applyPageSeo({
        title: 'About Our Editorial Board & Mission | The Growth Desk',
        description: 'Learn about The Growth Desk mission, editorial board standards, and our commitment to practical, debt-free business and career growth.',
        canonicalPath: '/about',
        keywords: ['about the growth desk', 'editorial mission', 'career editorial board'],
        schemas: [
          {
            '@type': 'AboutPage',
            '@id': `${SITE_CONFIG.canonicalOrigin}/about/#aboutpage`,
            'name': 'About The Growth Desk',
            'description': 'Editorial mission, board standards, and team background.',
            'url': `${SITE_CONFIG.canonicalOrigin}/about`
          }
        ]
      });
    } else if (currentView === 'contact') {
      applyPageSeo({
        title: 'Contact Our Editorial Team | The Growth Desk',
        description: 'Get in touch with The Growth Desk editorial board for article queries, expert contributions, feedback, and business partnerships.',
        canonicalPath: '/contact',
        keywords: ['contact the growth desk', 'editorial inquiries', 'business feedback'],
        schemas: [
          {
            '@type': 'ContactPage',
            '@id': `${SITE_CONFIG.canonicalOrigin}/contact/#contactpage`,
            'name': 'Contact The Growth Desk',
            'url': `${SITE_CONFIG.canonicalOrigin}/contact`
          }
        ]
      });
    } else if (currentView === 'privacy') {
      applyPageSeo({
        title: 'Privacy Policy & Data Protection | The Growth Desk',
        description: 'Read The Growth Desk privacy policy, detailing data protection practices, subscriber security, and transparent editorial policies.',
        canonicalPath: '/privacy',
        keywords: ['privacy policy', 'data protection', 'editorial privacy standards']
      });
    } else if (currentView === 'toolkit') {
      applyPageSeo({
        title: 'Career & Startup Toolkit | The Growth Desk',
        description: 'Interactive career and business tools including side hustle hourly target calculator and quarterly milestone execution checklist.',
        canonicalPath: '/toolkit',
        keywords: ['career toolkit', 'startup rate calculator', 'career roadmap planner']
      });
    } else if (currentView === 'saved') {
      applyPageSeo({
        title: 'Saved Blueprints | The Growth Desk',
        description: 'View your bookmarked blueprints and saved guides on The Growth Desk.',
        canonicalPath: '/saved',
        noindex: true
      });
    }
  }, [currentView, currentCategory, currentArticleSlug]);

  const handleNavigate = (
    view: string,
    params?: { category?: BlogCategory; slug?: string }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let targetPath = '/';
    if (view === 'article' && params?.slug) {
      const art = getArticleBySlug(params.slug);
      const cleanSlug = art ? art.slug : params.slug;
      setCurrentArticleSlug(cleanSlug);
      setCurrentView('article');
      targetPath = `/${cleanSlug}`;
    } else if (view === 'category' && params?.category) {
      setCurrentCategory(params.category);
      setCurrentView('category');
      targetPath = `/category/${params.category.toLowerCase()}`;
    } else if (view === 'home') {
      setCurrentView('home');
      targetPath = '/';
    } else {
      setCurrentView(view);
      targetPath = `/${view}`;
    }

    // Try HTML5 pushState for real clean URLs
    try {
      window.history.pushState(null, '', targetPath);
    } catch {
      // In restricted iframe environments, pushState may fail; fallback to hash
      window.location.hash = targetPath === '/' ? '' : targetPath;
    }
  };

  const handleSelectArticle = (slug: string) => {
    handleNavigate('article', { slug });
  };

  const toggleBookmark = (slug: string) => {
    setBookmarkedSlugs((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem('the_growth_desk_bookmarks', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedSlugs([]);
    try {
      localStorage.setItem('the_growth_desk_bookmarks', JSON.stringify([]));
    } catch {
      // Ignore
    }
  };

  // Find active article
  const activeArticle = currentArticleSlug
    ? getArticleBySlug(currentArticleSlug) || ALL_ARTICLES[0]
    : ALL_ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-amber-100 selection:text-slate-900">
      
      {/* Accessibility: Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg shadow-lg outline-none ring-2 ring-amber-600"
      >
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView === 'category' ? `category-${currentCategory}` : currentView}
        onNavigate={handleNavigate}
        savedCount={bookmarkedSlugs.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Main View Router */}
      <main id="main-content" className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
            bookmarkedSlugs={bookmarkedSlugs}
            onToggleBookmark={toggleBookmark}
            onOpenNewsletter={() => setIsNewsletterOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentView === 'article' && (
          <ArticlePage
            article={activeArticle}
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarkedSlugs.includes(activeArticle.slug)}
            onToggleBookmark={toggleBookmark}
            onOpenNewsletter={() => setIsNewsletterOpen(true)}
          />
        )}

        {currentView === 'category' && (
          <CategoryPage
            category={currentCategory}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            bookmarkedSlugs={bookmarkedSlugs}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {currentView === 'toolkit' && <CareerToolkit />}

        {currentView === 'about' && (
          <AboutPage
            onNavigateHome={() => handleNavigate('home')}
            onOpenNewsletter={() => setIsNewsletterOpen(true)}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'privacy' && <PrivacyPage />}

        {currentView === 'saved' && (
          <SavedArticlesPage
            bookmarkedSlugs={bookmarkedSlugs}
            onSelectArticle={handleSelectArticle}
            onToggleBookmark={toggleBookmark}
            onClearAll={clearAllBookmarks}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

    </div>
  );
}
