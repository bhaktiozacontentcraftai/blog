import React, { useState, useEffect } from 'react';
import { Article, BlogCategory } from '../types/blog';
import { TableOfContents } from '../components/TableOfContents';
import { CommentsSection } from '../components/CommentsSection';
import { SeoInspectorModal } from '../components/SeoInspectorModal';
import { getRelatedArticles } from '../data/articles';
import {
  Bookmark,
  Share2,
  Clock,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe,
  Type,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (view: string, params?: { category?: BlogCategory; slug?: string }) => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onOpenNewsletter: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigate,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenNewsletter,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [proseFont, setProseFont] = useState<'sans' | 'serif'>('sans');
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const relatedArticles = getRelatedArticles(article.id, 3);

  // Scroll listener for reading progress bar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.slug]);

  const handleSectionScroll = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" by ${article.author.name} on The Growth Desk:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="relative pb-24">
      {/* 1. Sticky Reading Progress Indicator */}
      <div className="fixed top-18 left-0 right-0 h-1 bg-slate-100 z-30">
        <div
          className="h-full bg-amber-600 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </button>
            <span aria-hidden="true">/</span>
            <button
              onClick={() => onNavigate('category', { category: article.category })}
              className="hover:text-slate-900 transition-colors shrink-0"
            >
              {article.category}
            </button>
            <span aria-hidden="true" className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-slate-400 truncate">{article.title}</span>
          </div>

          {/* Quick Inspector CTA */}
          <button
            onClick={() => setShowSeoModal(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200/80 shrink-0"
            title="Inspect SEO keywords, SERP preview, and schema"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>SEO Inspector</span>
          </button>
        </div>

        {/* 2. Article Header */}
        <header className="max-w-4xl mx-auto space-y-6 pt-4 pb-8">
          {/* Zero-pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-amber-700 uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.subCategory}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Updated {article.updatedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.18] text-balance">
            {article.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-sans font-light">
            {article.subtitle}
          </p>

          {/* Author Byline & Article Toolbar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">{article.author.name}</span>
                <span className="text-xs text-slate-500">{article.author.role}</span>
              </div>
            </div>

            {/* Reading Toolbar */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              {/* Font Sizer */}
              <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === 'normal' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'}`}
                  title="Standard text size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded text-sm font-semibold ${fontSize === 'large' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'}`}
                  title="Larger reading text"
                >
                  A+
                </button>
              </div>

              {/* Prose Font Style */}
              <button
                onClick={() => setProseFont(proseFont === 'sans' ? 'serif' : 'sans')}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                title={`Switch font (current: ${proseFont})`}
              >
                <Type className="w-4 h-4" />
              </button>

              {/* Bookmark */}
              <button
                onClick={() => onToggleBookmark(article.slug)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked ? 'text-amber-600 bg-amber-50' : 'hover:bg-slate-100 text-slate-500'
                }`}
                title={isBookmarked ? 'Saved' : 'Bookmark guide'}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              {/* Share */}
              <button
                onClick={handleCopyLink}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                title="Copy link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* 3. Featured Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-900 aspect-16/9">
            {!imgError && article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white">
                <BookOpen className="w-12 h-12 text-amber-400 mb-2 opacity-80" />
                <span className="text-xs uppercase tracking-widest text-slate-400">The Growth Desk Editorial</span>
                <p className="text-base font-serif italic mt-2 text-slate-200">{article.title}</p>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-500 italic mt-2 text-center">
            {article.imageAlt}
          </p>
        </div>

        {/* 4. Two-Column Asymmetric Reading Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body (Column 1: approx 70% on desktop) */}
          <main className="lg:col-span-8 max-w-prose mx-auto lg:mx-0 w-full">
            <div className={`space-y-8 text-slate-800 ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'} ${proseFont === 'serif' ? 'font-serif' : 'font-sans'}`}>
              
              {/* Introduction paragraphs with initial drop cap */}
              <div className="space-y-4 text-slate-700">
                {article.introParagraphs.map((para, idx) => {
                  if (idx === 0) {
                    return (
                      <p
                        key={idx}
                        className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-slate-900 leading-relaxed"
                      >
                        {para}
                      </p>
                    );
                  }
                  return <p key={idx} className="leading-relaxed">{para}</p>;
                })}
              </div>

              {/* Dynamic Sections */}
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="pt-6 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight pt-2 border-t border-slate-200">
                    {section.heading}
                  </h2>

                  {section.content && (
                    <div className="space-y-3">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed text-slate-700">{p}</p>
                      ))}
                    </div>
                  )}

                  {/* Bullet list if present */}
                  {section.listItems && (
                    <ul className="space-y-2.5 my-4 pl-4 border-l border-amber-300">
                      {section.listItems.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm leading-relaxed text-slate-700 pl-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Table if present */}
                  {section.table && (
                    <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-800 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-700 leading-normal">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Callout box if present */}
                  {section.callout && (
                    <div className="my-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-sm italic text-slate-800 font-serif leading-relaxed">
                        {section.callout.text}
                      </p>
                      {section.callout.source && (
                        <span className="text-[11px] font-semibold uppercase text-amber-700 block tracking-wider">
                          — {section.callout.source}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Subsections if present */}
                  {section.subsections && (
                    <div className="space-y-6 pt-2">
                      {section.subsections.map((sub) => (
                        <div key={sub.id} id={sub.id} className="space-y-3 pt-2">
                          <h3 className="text-xl font-serif font-bold text-slate-900">
                            {sub.heading}
                          </h3>

                          {sub.content.map((sp, spIdx) => (
                            <p key={spIdx} className="text-slate-700 leading-relaxed">{sp}</p>
                          ))}

                          {sub.callout && (
                            <div className="my-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                              <p className="text-xs sm:text-sm italic text-amber-950 leading-relaxed font-serif">
                                {sub.callout.text}
                              </p>
                              {sub.callout.source && (
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 block mt-1">
                                  — {sub.callout.source}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* 5. Key Takeaways Summary Box */}
              <div className="my-10 p-6 sm:p-7 bg-slate-900 text-white rounded-2xl shadow-sm space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Key Takeaways Summary
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Executive Action Points
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {article.keyTakeaways.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Conclusion & Call to Action */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Final Verdict & Next Steps
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {article.conclusion}
                </p>
                <div className="p-5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {article.callToAction}
                </div>
              </div>

              {/* 7. Strategic Internal Links Section */}
              <div className="pt-8 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                  Continue Reading on The Growth Desk
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.internalLinks.map((link, lIdx) => (
                    <div
                      key={lIdx}
                      onClick={() => onSelectArticle(link.targetSlug)}
                      className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-semibold text-amber-700">Related Guide</span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{link.context}</p>
                      </div>
                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                        <span>Read Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Frequently Asked Questions (Accordion) */}
              <div className="pt-10 space-y-4 border-t border-slate-200">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {article.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndexes.includes(fIdx);
                    return (
                      <div
                        key={fIdx}
                        className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs"
                      >
                        <button
                          onClick={() => toggleFaq(fIdx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 9. Interactive Comments Section */}
              <CommentsSection articleSlug={article.slug} />

            </div>
          </main>

          {/* Sticky Sidebar (Column 2: approx 30% on desktop) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              
              {/* Table of Contents */}
              <TableOfContents
                sections={article.sections}
                activeSectionId={activeSectionId}
                onSectionClick={handleSectionScroll}
              />

              {/* Author Profile Card */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Written By
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 font-serif font-bold text-lg flex items-center justify-center shrink-0">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{article.author.name}</h4>
                    <p className="text-xs text-slate-500">{article.author.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {article.author.bio}
                </p>
              </div>

              {/* Social Sharing Mini Widget */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                <span className="font-semibold text-slate-700 block">Share This Blueprint</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareTwitter}
                    className="flex-1 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-center font-medium text-slate-700 transition-colors"
                  >
                    X / Twitter
                  </button>
                  <button
                    onClick={handleShareLinkedIn}
                    className="flex-1 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-center font-medium text-slate-700 transition-colors"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Related Articles Box */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  More in {article.category}
                </span>
                <div className="space-y-3 divide-y divide-slate-100">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel.slug)}
                      className="pt-2.5 first:pt-0 cursor-pointer group"
                    >
                      <span className="text-[10px] text-slate-400">{rel.readTime}</span>
                      <h5 className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Callout */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-serif font-bold text-white">Join 28,000+ Subscribers</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get our Sunday morning executive dispatch with actionable business and career frameworks.
                </p>
                <button
                  onClick={onOpenNewsletter}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  Subscribe Free
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* SEO Inspector Modal */}
      <SeoInspectorModal
        article={article}
        isOpen={showSeoModal}
        onClose={() => setShowSeoModal(false)}
        onNavigateSlug={(slug) => {
          setShowSeoModal(false);
          onSelectArticle(slug);
        }}
      />
    </div>
  );
};
