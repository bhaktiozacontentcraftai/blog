import React from 'react';
import { BlogCategory } from '../types/blog';
import { ArrowUpRight, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: { category?: BlogCategory; slug?: string }) => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenNewsletter }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-serif font-bold text-sm">
                G
              </div>
              <span className="text-lg font-bold text-white tracking-tight">The Growth Desk</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Practical, empirical, and actionable ideas for business formation, career advancement, executive productivity, and sustainable professional wealth.
            </p>
            <div className="pt-2">
              <span className="text-xs text-amber-400/90 font-medium">Tagline:</span>
              <p className="text-xs text-slate-300 italic">Practical Ideas for Business and Career Growth</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Editorial Topics</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('category', { category: 'Business' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Business & Startups
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { category: 'Career' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Career & Resumes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', { category: 'Productivity' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Productivity & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('toolkit')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Startup & Career Calculators
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Pages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">The Publication</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Free Newsletter CTA Box */}
          <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Mail className="w-4 h-4" />
              <span>Weekly Dispatch</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every Sunday morning: 1 deep career essay, 2 vetted business frameworks, and 3 high-leverage tools.
            </p>
            <button
              onClick={onOpenNewsletter}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-colors"
            >
              <span>Join 28,400+ Readers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-500 text-center">Zero spam. Unsubscribe with 1-click anytime.</p>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} The Growth Desk. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-400 transition-colors">
              Privacy
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-400 transition-colors">
              Editorial Charter
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
