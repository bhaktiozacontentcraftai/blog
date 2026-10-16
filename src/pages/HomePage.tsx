import React, { useState } from 'react';
import { ALL_ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { BlogCategory } from '../types/blog';
import { Search, ArrowRight, TrendingUp, ShieldCheck, Zap, BookOpen } from 'lucide-react';

interface HomePageProps {
  onSelectArticle: (slug: string) => void;
  onNavigate: (view: string, params?: { category?: BlogCategory; slug?: string }) => void;
  bookmarkedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
  onOpenNewsletter: () => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectArticle,
  onNavigate,
  bookmarkedSlugs,
  onToggleBookmark,
  onOpenNewsletter,
  onOpenSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');

  // Featured lead article
  const leadArticle = ALL_ARTICLES[0];
  // Secondary featured articles
  const secondaryArticles = ALL_ARTICLES.slice(1, 3);

  // Filtered remaining articles
  const filteredArticles = ALL_ARTICLES.filter((article) => {
    if (selectedCategory === 'All') return true;
    return article.category === selectedCategory;
  });

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Zero-pill quiet kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700">
                <span>The Growth Desk</span>
                <span aria-hidden="true">·</span>
                <span>Editorial Dispatch</span>
                <span aria-hidden="true">·</span>
                <span>2026/2027 Edition</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12] text-balance">
                Practical Ideas for Business and Career Growth.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Rigorous, step-by-step blueprints for launching lean businesses, engineering high-impact resumes, acing executive interviews, and mastering workday productivity—without the fluff.
              </p>

              {/* Functional Search Bar */}
              <div className="pt-2 max-w-lg">
                <div
                  onClick={onOpenSearch}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-100/70 transition-all cursor-pointer shadow-2xs"
                >
                  <Search className="w-4.5 h-4.5 text-slate-400" />
                  <span className="text-xs sm:text-sm font-medium">Search 10 complete guides, interview scripts, templates...</span>
                  <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free & Actionable</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Unit Economics Grounded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>No Sponsored AI Hype</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg aspect-4/3 bg-slate-900 group">
                <img
                  src="/src/assets/images/hero-business-desk.webp"
                  alt="Modern executive desk workspace with leather notebook, laptop and brass pen"
                  width={640}
                  height={480}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">Featured Blueprint</span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1 leading-snug">
                    Lean Bootstrapping & Career Trajectories
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Discover how ambitious founders build profitable companies without outside debt.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Lead Story Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Featured Editorial Story
            </h2>
          </div>
          <span className="text-xs text-slate-400">Hand-Picked by Senior Editors</span>
        </div>

        <ArticleCard
          article={leadArticle}
          onSelect={onSelectArticle}
          isBookmarked={bookmarkedSlugs.includes(leadArticle.slug)}
          onToggleBookmark={onToggleBookmark}
          variant="featured"
        />
      </section>

      {/* 3. Secondary Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={bookmarkedSlugs.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
              variant="standard"
            />
          ))}
        </div>
      </section>

      {/* 4. Interactive Growth Toolkit Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-7 sm:p-10 text-white border border-slate-700/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Utilities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Calculate your side hustle rate and track your 90-day career roadmap.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use our live rate calculator to determine pricing for after-work clients and monitor your progress across key promotion milestones.
            </p>
          </div>

          <button
            onClick={() => onNavigate('toolkit')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>Launch Career Toolkit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Complete Article Library & Category Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              The Growth Desk Library
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Browse all 10 comprehensive business and career guides.
            </p>
          </div>

          {/* Interactive Category Tabs (Functional Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {(['All', 'Business', 'Career', 'Productivity'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-column Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={bookmarkedSlugs.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
              variant="standard"
            />
          ))}
        </div>
      </section>

      {/* 6. Editorial Standards & Guiding Philosophy */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              The Growth Desk Editorial Charter
            </h2>
            <p className="text-xs text-slate-600">
              How our editorial team approaches research, advice, and financial reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">Empirical & Verifiable</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We avoid vague platitudes. Every strategy is rooted in proven unit economics, actual hiring data, and operational blueprints tested in real organizations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">Anti-AI Slop & Human First</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We reject generic, repetitive filler. Our articles are crafted to provide immediate, actionable steps you can execute in your workplace or business today.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">Sustainable Growth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not endorse reckless get-rich-quick schemes. We champion resilient career compounding, healthy work boundaries, and cash-flow positive entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Never Miss an Issue
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 max-w-lg mx-auto">
            Stay ahead with the Sunday Growth Dispatch.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Delivered directly to your inbox every Sunday morning. Actionable career tactics and business frameworks you can apply before Monday standup.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenNewsletter}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2"
            >
              <span>Join 28,000+ Readers Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
