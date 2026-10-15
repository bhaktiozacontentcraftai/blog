import React, { useState } from 'react';
import { BlogCategory } from '../types/blog';
import { getArticlesByCategory } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft, BookOpen, Clock, ShieldCheck } from 'lucide-react';

interface CategoryPageProps {
  category: BlogCategory;
  onSelectArticle: (slug: string) => void;
  onNavigateHome: () => void;
  bookmarkedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onSelectArticle,
  onNavigateHome,
  bookmarkedSlugs,
  onToggleBookmark,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const articles = getArticlesByCategory(category);

  // Extract distinct subcategories
  const subCategories = ['All', ...Array.from(new Set(articles.map((a) => a.subCategory)))];

  const filtered = selectedSubCategory === 'All'
    ? articles
    : articles.filter((a) => a.subCategory === selectedSubCategory);

  const categoryDescriptions: Record<BlogCategory, { tagline: string; description: string }> = {
    Business: {
      tagline: 'Entrepreneurship & Small Business Growth',
      description: 'Battle-tested frameworks on bootstrapping low-overhead ventures, managing cash flow, acquiring paying clients, and avoiding fatal startup pitfalls.',
    },
    Career: {
      tagline: 'Job Search, Resumes & Executive Trajectories',
      description: 'Data-backed blueprints for beating ATS parsers, commanding high-stakes interviews, mastering salary negotiations, and engineering 90-day promotions.',
    },
    Productivity: {
      tagline: 'Time Management, Leadership & Deep Work',
      description: 'Executive playbooks for eliminating workday friction, mastering the 5 levels of delegation, protecting deep work focus, and preventing burnout.',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Category Header */}
      <div className="space-y-4 max-w-3xl">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
          <span aria-hidden="true">/</span>
          <span>Categories</span>
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700">
            <span>The Growth Desk</span>
            <span aria-hidden="true">·</span>
            <span>{category} Department</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            {categoryDescriptions[category].tagline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
            {categoryDescriptions[category].description}
          </p>
        </div>

        {/* Quick Department Stats */}
        <div className="pt-2 flex items-center gap-6 text-xs text-slate-500 border-t border-slate-200">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            {articles.length} In-Depth Blueprints
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Updated October 2026
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Peer-Reviewed Strategy
          </span>
        </div>
      </div>

      {/* Subcategory Filter Tabs (Functional Buttons) */}
      {subCategories.length > 2 && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedSubCategory === sub
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((article) => (
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

    </div>
  );
};
