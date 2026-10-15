import React from 'react';
import { ALL_ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Bookmark, ArrowLeft, BookOpen, Trash2 } from 'lucide-react';

interface SavedArticlesPageProps {
  bookmarkedSlugs: string[];
  onSelectArticle: (slug: string) => void;
  onToggleBookmark: (slug: string) => void;
  onClearAll: () => void;
  onNavigateHome: () => void;
}

export const SavedArticlesPage: React.FC<SavedArticlesPageProps> = ({
  bookmarkedSlugs,
  onSelectArticle,
  onToggleBookmark,
  onClearAll,
  onNavigateHome,
}) => {
  const savedArticles = ALL_ARTICLES.filter((a) => bookmarkedSlugs.includes(a.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              Your Saved Blueprints ({savedArticles.length})
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Articles bookmarked for offline study, interview preparation, and business execution.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved List</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              variant="standard"
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-800">No saved guides yet</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the bookmark icon on any article card or guide header to save it to your personal reading list.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Explore Library
          </button>
        </div>
      )}

    </div>
  );
};
