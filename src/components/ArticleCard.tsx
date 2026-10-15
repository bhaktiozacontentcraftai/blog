import React, { useState } from 'react';
import { Article } from '../types/blog';
import { Bookmark, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  variant = 'standard',
}) => {
  const [imgError, setImgError] = useState(false);

  // Fallback icon/color based on category
  const categoryTheme = {
    Business: 'from-slate-900 to-slate-800 text-amber-400',
    Career: 'from-slate-900 to-blue-950 text-blue-400',
    Productivity: 'from-slate-900 to-emerald-950 text-emerald-400',
  }[article.category] || 'from-slate-900 to-slate-800 text-amber-400';

  if (variant === 'featured') {
    return (
      <article className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual column */}
        <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-slate-900">
          {!imgError && article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryTheme} flex flex-col items-center justify-center p-8 text-center`}>
              <BookOpen className="w-12 h-12 mb-3 opacity-60" />
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">{article.category} Special Feature</span>
              <p className="text-sm text-slate-300 font-serif italic mt-2 max-w-sm">{article.title}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Content column */}
        <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Clean unboxed metadata with typographic separators - strictly no pill badges */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-amber-700 uppercase tracking-wider">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishDate}</span>
            </div>

            <h2
              onClick={() => onSelect(article.slug)}
              className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer leading-tight text-balance"
            >
              {article.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            {/* Author info */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800">{article.author.name}</span>
                <span className="text-[11px] text-slate-500 truncate max-w-[150px]">{article.author.role}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(article.slug);
                }}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title={isBookmarked ? 'Saved' : 'Save for later'}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={() => onSelect(article.slug)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelect(article.slug)}
        className="group p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
      >
        <div className="space-y-2">
          {/* Unboxed metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-amber-700">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{article.author.name}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Card Thumbnail */}
        <div
          onClick={() => onSelect(article.slug)}
          className="relative aspect-16/10 overflow-hidden bg-slate-900 cursor-pointer"
        >
          {!imgError && article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400 ease-out"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryTheme} flex flex-col items-center justify-center p-6 text-center`}>
              <BookOpen className="w-8 h-8 mb-2 opacity-60" />
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-medium">{article.category}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Zero-pill unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-amber-700 uppercase tracking-wider text-[11px]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate.split(',')[0]}</span>
          </div>

          <h3
            onClick={() => onSelect(article.slug)}
            className="text-lg font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-700 shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <span className="text-xs font-medium text-slate-700 truncate max-w-[130px]">{article.author.name}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleBookmark(article.slug)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            className={`p-1.5 rounded-md transition-colors ${
              isBookmarked
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Saved' : 'Save for later'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={() => onSelect(article.slug)}
            className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-slate-100 rounded-md transition-colors"
            title="Read full guide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
