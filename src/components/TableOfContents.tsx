import React from 'react';
import { ArticleSection } from '../types/blog';
import { ListFilter } from 'lucide-react';

interface TableOfContentsProps {
  sections: ArticleSection[];
  activeSectionId?: string;
  onSectionClick: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSectionId,
  onSectionClick,
}) => {
  return (
    <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800">
        <ListFilter className="w-3.5 h-3.5 text-amber-600" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 text-xs">
        {sections.map((section, idx) => {
          const isActive = activeSectionId === section.id;
          return (
            <div key={section.id} className="space-y-1">
              <button
                onClick={() => onSectionClick(section.id)}
                className={`block w-full text-left py-1.5 px-2 rounded-md transition-colors leading-relaxed ${
                  isActive
                    ? 'bg-white text-amber-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {section.heading}
              </button>

              {section.subsections && section.subsections.length > 0 && (
                <div className="pl-3 space-y-0.5 border-l border-slate-200 ml-2">
                  {section.subsections.map((sub) => {
                    const isSubActive = activeSectionId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onSectionClick(sub.id)}
                        className={`block w-full text-left py-1 px-2 rounded transition-colors text-[11px] truncate ${
                          isSubActive
                            ? 'text-amber-700 font-medium bg-amber-50/50'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {sub.heading}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
