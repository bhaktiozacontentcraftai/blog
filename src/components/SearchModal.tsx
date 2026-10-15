import React, { useState, useEffect, useRef } from 'react';
import { searchArticles } from '../data/articles';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { BlogCategory } from '../types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | BlogCategory>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setCategoryFilter('All');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchArticles(query, categoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 10 articles, guides, keywords, or topics..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          {(['All', 'Business', 'Career', 'Productivity'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[11px] text-slate-400 ml-auto whitespace-nowrap pl-2">
            {results.length} {results.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-slate-100">
          {results.length > 0 ? (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.slug);
                  onClose();
                }}
                className="group p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-amber-700">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.author.name}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{article.excerpt}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No guides matched "{query}"</p>
              <p className="text-xs text-slate-400">Try searching for keywords like "resume", "startup", "interview", or "time management".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
