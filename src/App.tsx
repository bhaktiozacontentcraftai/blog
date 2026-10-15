import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentCategory, setCurrentCategory] = useState<BlogCategory>('Business');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string>('');
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
        // Pre-bookmark a couple of essential blueprints for a delightful first impression
        const defaultSaves = [
          'how-to-start-a-small-business-with-little-money',
          '15-common-job-interview-questions-and-how-to-answer-them',
        ];
        setBookmarkedSlugs(defaultSaves);
        localStorage.setItem('the_growth_desk_bookmarks', JSON.stringify(defaultSaves));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Sync with browser hash for seamless deep-linking & back-button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
      } else if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        setCurrentArticleSlug(slug);
        setCurrentView('article');
      } else if (hash.startsWith('category/')) {
        const cat = hash.replace('category/', '') as BlogCategory;
        if (['Business', 'Career', 'Productivity'].includes(cat)) {
          setCurrentCategory(cat);
          setCurrentView('category');
        }
      } else if (['about', 'contact', 'privacy', 'saved', 'toolkit'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleNavigate = (
    view: string,
    params?: { category?: BlogCategory; slug?: string }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'article' && params?.slug) {
      setCurrentArticleSlug(params.slug);
      setCurrentView('article');
      window.location.hash = `/article/${params.slug}`;
    } else if (view === 'category' && params?.category) {
      setCurrentCategory(params.category);
      setCurrentView('category');
      window.location.hash = `/category/${params.category}`;
    } else {
      setCurrentView(view);
      window.location.hash = `/${view}`;
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
      
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView === 'category' ? `category-${currentCategory}` : currentView}
        onNavigate={handleNavigate}
        savedCount={bookmarkedSlugs.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
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
