import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    // Store message in localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('growth_desk_inquiries') || '[]');
      messages.push({ name, email, topic, message, date: new Date().toISOString() });
      localStorage.setItem('growth_desk_inquiries', JSON.stringify(messages));
    } catch {
      // Ignore
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700">
          <span>The Growth Desk</span>
          <span aria-hidden="true">·</span>
          <span>Contact & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Get in Touch With Our Editorial Board.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
          Whether you have a reader question, feedback on a specific article, a case study to propose, or a strategic partnership inquiry, we would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-2xl border border-slate-200/90 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <span className="font-semibold text-slate-800">{name}</span>. A member of our editorial staff will review your message and reply to <span className="font-semibold text-slate-800">{email}</span> within 48 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-900"
                >
                  <option value="Editorial Feedback">Feedback on an Article</option>
                  <option value="Guest Contribution">Pitch a Guest Blueprint / Case Study</option>
                  <option value="Career Advisory">Question for Marcus Vance (Talent & Resumes)</option>
                  <option value="Startup Advisory">Question for Elena Rostova (Small Business)</option>
                  <option value="Productivity Advisory">Question for Priya Patel (Operations & Focus)</option>
                  <option value="Partnerships">Corporate Training & Partnerships</option>
                  <option value="Other">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide context regarding your question or proposal..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                We respect your inbox privacy and never sell or share contact information.
              </p>
            </form>
          )}
        </div>

        {/* Office & Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Editorial Desk:</span>
                  <a href="mailto:editorial@thegrowthdesk.com" className="text-amber-800 hover:underline">
                    editorial@thegrowthdesk.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Response Commitment:</span>
                  <span>Within 24 to 48 business hours (Monday – Friday, 9am – 5pm EST).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Editorial Headquarters:</span>
                  <span>The Growth Desk Publications, 450 Lexington Avenue, Suite 1400, New York, NY 10017</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Have a Quick Question?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your question is related to one of our 10 published blueprints, feel free to leave a comment directly beneath that article. Our authors check comment threads every Tuesday and Thursday!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
