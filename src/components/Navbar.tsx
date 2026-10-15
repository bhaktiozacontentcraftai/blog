import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ArrowRight } from 'lucide-react';
import { BlogCategory } from '../types/blog';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: { category?: BlogCategory; slug?: string }) => void;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenNewsletter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenSearch,
  onOpenNewsletter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string, params?: { category?: BlogCategory; slug?: string }) => {
    onNavigate(view, params);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 font-serif font-bold text-lg shadow-xs group-hover:bg-slate-800 transition-colors">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                The Growth Desk
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'home' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('category', { category: 'Business' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'category-Business' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Business
            </button>
            <button
              onClick={() => handleNav('category', { category: 'Career' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'category-Career' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Career
            </button>
            <button
              onClick={() => handleNav('category', { category: 'Productivity' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'category-Productivity' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Productivity
            </button>
            <button
              onClick={() => handleNav('toolkit')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'toolkit' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Toolkit
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'about' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'contact' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action + search/bookmarks utility */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              title="Search articles"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => handleNav('saved')}
              aria-label="Saved articles"
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              title="Saved Articles"
            >
              <Bookmark className="w-4.5 h-4.5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenNewsletter}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('category', { category: 'Business' })}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Business & Entrepreneurship
          </button>
          <button
            onClick={() => handleNav('category', { category: 'Career' })}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Career Advancement & Resumes
          </button>
          <button
            onClick={() => handleNav('category', { category: 'Productivity' })}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Productivity & Leadership
          </button>
          <button
            onClick={() => handleNav('toolkit')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Career & Startup Toolkit
          </button>
          <button
            onClick={() => handleNav('about')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Contact
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-md"
          >
            Privacy Policy
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewsletter();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Join Our Free Newsletter
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
