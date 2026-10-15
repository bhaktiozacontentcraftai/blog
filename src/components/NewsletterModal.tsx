import React, { useState } from 'react';
import { X, CheckCircle, Mail, Sparkles } from 'lucide-react';
import { BlogCategory } from '../types/blog';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: BlogCategory;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
  defaultCategory,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    business: true,
    career: true,
    productivity: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('the_growth_desk_subscribers') || '[]');
      existing.push({ email, name, preferences, date: new Date().toISOString() });
      localStorage.setItem('the_growth_desk_subscribers', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">You’re on the Dispatch List!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              We just sent a welcome confirmation note to <span className="font-semibold text-slate-800">{email}</span>. Look out for your first Sunday morning executive memo.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Back to Reading
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Sunday Growth Dispatch</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Practical frameworks in your inbox every weekend.
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Join 28,000+ ambitious professionals, founders, and career climbers. 100% actionable guides, zero promotional filler.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Work or Personal Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="pt-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Topics of Interest
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.business}
                      onChange={(e) => setPreferences({ ...preferences, business: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>Business Strategy & Startup Bootstrapping</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.career}
                      onChange={(e) => setPreferences({ ...preferences, career: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>Career Advancement, Resumes & Interviews</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.productivity}
                      onChange={(e) => setPreferences({ ...preferences, productivity: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>Time Management, Deep Work & Leadership</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                Join Free Newsletter
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-normal">
                By subscribing, you agree to receive our weekly dispatch. We protect your privacy and never share your data.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
