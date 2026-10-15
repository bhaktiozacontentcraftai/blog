import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700">
          <Shield className="w-4 h-4 text-amber-600" />
          <span>Legal & Editorial Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-sans">
          Last Updated & Reviewed: October 14, 2026 · Standard Editorial Template for Publication
        </p>
      </div>

      {/* Template Notice */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
        <div className="font-semibold flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Notice for Publishers & Site Operators:</span>
        </div>
        <p className="leading-relaxed">
          This privacy policy represents an adaptable legal template crafted for digital publications, content creators, and professional blogs. Please review and customize placeholders (such as legal entity registration details) to comply with your specific regional jurisdictions.
        </p>
      </div>

      {/* Main Policy Content */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            1. Introduction & Overview
          </h2>
          <p>
            The Growth Desk ("we", "our", or "the Publication") is committed to safeguarding the privacy and personal integrity of our readers, subscribers, and community members. This Privacy Policy outlines the types of information we collect when you visit our website (thegrowthdesk.com), how that information is utilized, and the rigorous safeguards we implement to protect your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            2. Information We Collect
          </h2>
          <p>We collect information in two primary categories:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Voluntarily Provided Information:</strong> When you subscribe to our Sunday Growth Dispatch newsletter, submit a message via our Contact form, or participate in article discussions, we collect information such as your name, email address, job title, and comment text.
            </li>
            <li>
              <strong>Automatically Collected Diagnostic Data:</strong> Like standard web platforms, our servers automatically collect non-personally identifiable technical information, including your IP address, browser type, referring pages, and device operating system to maintain site stability and security.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            3. How We Use Your Information
          </h2>
          <p>The Growth Desk uses collected data exclusively for explicit, legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Delivering our weekly editorial newsletter to your inbox.</li>
            <li>Responding to editorial feedback, guest author pitches, or reader inquiries.</li>
            <li>Preventing spam and abusive activity in article comment sections.</li>
            <li>Analyzing aggregate reading trends to improve our business and career guides.</li>
          </ul>
          <p className="font-medium text-slate-900 pt-1">
            We will never sell, rent, or trade your personal email address or reading habits to third-party data brokers or advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            4. Cookies & Local Storage
          </h2>
          <p>
            We use functional browser storage and minimal cookies to remember your reading preferences (e.g., your saved/bookmarked articles, preferred font size, and light/reading mode). We do not use intrusive cross-site behavioral tracking pixels.
          </p>
          <p>
            You can configure your web browser to reject cookies or clear local storage at any time through your browser settings without losing access to our written articles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            5. Reader Rights (GDPR & CCPA / CPRA Compliance)
          </h2>
          <p>
            Depending on your jurisdiction (such as the European Economic Area, the United Kingdom, or the State of California), you possess specific statutory rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>The Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
            <li><strong>The Right to Rectification:</strong> You may request corrections to inaccurate personal records.</li>
            <li><strong>The Right to Erasure ("Right to Be Forgotten"):</strong> You may request that we permanently delete your email address and any posted comments.</li>
            <li><strong>The Right to Opt-Out:</strong> Every newsletter email sent by The Growth Desk contains an immediate, 1-click unsubscribe link at the bottom of the message.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            6. Data Security & Storage
          </h2>
          <p>
            We apply industry-standard Transport Layer Security (TLS/HTTPS) encryption to protect all data transmissions between your browser and our servers. Access to subscriber databases is strictly restricted to authorized editorial administrators with multi-factor authentication.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            7. Editorial Contact & Inquiries
          </h2>
          <p>
            For questions regarding this Privacy Policy or to exercise your data rights, please contact our Data Governance Officer at:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono text-xs">
            <p className="font-sans font-semibold text-slate-900">The Growth Desk Legal & Editorial Desk</p>
            <p>Email: privacy@thegrowthdesk.com</p>
            <p>Address: 450 Lexington Avenue, Suite 1400, New York, NY 10017</p>
          </div>
        </section>

      </div>
    </div>
  );
};
