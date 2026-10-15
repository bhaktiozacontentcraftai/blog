import React, { useState } from 'react';
import { Article } from '../types/blog';
import { X, Check, Copy, Globe, Search, Link as LinkIcon, Image, Sparkles } from 'lucide-react';

interface SeoInspectorModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  onNavigateSlug?: (slug: string) => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({
  article,
  isOpen,
  onClose,
  onNavigateSlug,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonLdCode = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.seo.metaTitle,
      description: article.seo.metaDescription,
      datePublished: '2026-10-10T08:00:00Z',
      dateModified: '2026-10-14T12:00:00Z',
      mainEntityOfPage: `https://thegrowthdesk.com/${article.seo.suggestedSlug}`,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Growth Desk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thegrowthdesk.com/logo.png',
        },
      },
      keywords: [article.seo.primaryKeyword, ...article.seo.secondaryKeywords].join(', '),
      image: article.featuredImage,
    },
    null,
    2
  );

  const handleCopyJsonLd = () => {
    navigator.clipboard.writeText(jsonLdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">SEO & Editorial Meta Inspector</h3>
              <p className="text-xs text-slate-500">Search Engine Optimization Specifications & SERP Simulator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-7 text-xs">
          
          {/* SERP Simulator */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                Google SERP Snippet Preview
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">Optimal Desktop View</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1 font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-800">
                  G
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-800 font-normal">thegrowthdesk.com</span>
                  <span className="text-slate-400">› {article.category.toLowerCase()} › {article.seo.suggestedSlug}</span>
                </div>
              </div>
              <h4 className="text-base sm:text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
                {article.seo.metaTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                {article.seo.metaDescription}
              </p>
            </div>
          </div>

          {/* Core Metadata Table */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Target Keywords & URL Parameters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Primary Keyword</span>
                <span className="text-xs font-semibold text-slate-900 select-all font-mono">{article.seo.primaryKeyword}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Suggested Slug</span>
                <span className="text-xs font-mono text-slate-900 select-all">/{article.seo.suggestedSlug}</span>
              </div>
            </div>

            {/* Secondary Keywords */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Secondary Semantic Keywords</span>
              <div className="flex flex-wrap gap-1.5">
                {article.seo.secondaryKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-700">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Concept & Alt Text */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-amber-600" />
              Featured Image Concept & Accessibility
            </span>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400 block">Creative Concept</span>
                <p className="text-slate-700 italic mt-0.5">{article.imageConcept}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-semibold uppercase text-slate-400 block">Descriptive Alt Text</span>
                <p className="text-slate-900 font-mono text-[11px] mt-0.5">alt="{article.imageAlt}"</p>
              </div>
            </div>
          </div>

          {/* Internal Linking Recommendations */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-amber-600" />
              Strategic Internal Links
            </span>
            <div className="space-y-2">
              {article.internalLinks.map((link, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <button
                      onClick={() => {
                        onClose();
                        if (onNavigateSlug) onNavigateSlug(link.targetSlug);
                      }}
                      className="text-xs font-semibold text-slate-900 hover:text-amber-700 text-left transition-colors"
                    >
                      {link.title}
                    </button>
                    <p className="text-[11px] text-slate-500 mt-0.5">{link.context}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">/{link.targetSlug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schema.org Structured Data Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Schema.org JSON-LD (BlogPosting)
              </span>
              <button
                onClick={handleCopyJsonLd}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied JSON-LD' : 'Copy Schema'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto max-h-48">
              <code>{jsonLdCode}</code>
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
