import React, { useState, useEffect } from 'react';
import { Comment } from '../types/blog';
import { INITIAL_COMMENTS } from '../data/articles';
import { MessageSquare, ThumbsUp, Send, Check } from 'lucide-react';

interface CommentsSectionProps {
  articleSlug: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ articleSlug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load comments from localStorage combined with INITIAL_COMMENTS
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`comments_${articleSlug}`);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        const matchingDefaults = INITIAL_COMMENTS.filter(
          (c) => c.articleSlug === articleSlug
        );
        setComments(matchingDefaults);
      }

      const storedLikes = localStorage.getItem('user_liked_comments');
      if (storedLikes) {
        setLikedIds(JSON.parse(storedLikes));
      }
    } catch {
      // Fallback
      setComments([]);
    }
  }, [articleSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: 'usr_' + Date.now(),
      articleSlug,
      authorName: name.trim(),
      authorRole: role.trim() || 'Reader & Professional',
      content: content.trim(),
      date: 'Just now',
      likes: 0,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setName('');
    setRole('');
    setContent('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3500);
  };

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;

    const updatedLikes = [...likedIds, id];
    setLikedIds(updatedLikes);
    try {
      localStorage.setItem('user_liked_comments', JSON.stringify(updatedLikes));
    } catch {
      // Ignore
    }

    const updated = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    try {
      localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <section className="pt-10 mt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-600" />
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Discussion & Insights ({comments.length})
          </h3>
        </div>
        <span className="text-xs text-slate-500">Professional & Constructive Discourse</span>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/90 mb-10 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Join the conversation
        </h4>

        {successMsg && (
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your insight has been published.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rachel Adams"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Your Title or Company (Optional)</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Head of Talent @ Apex Inc"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Your Comment or Question *</label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your practical experience, ask a follow-up question, or offer a counter-perspective..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <span>Post Insight</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const hasLiked = likedIds.includes(comment.id);
            return (
              <div
                key={comment.id}
                className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      {comment.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900">{comment.authorName}</span>
                      {comment.authorRole && (
                        <span className="text-[11px] text-slate-500 block">{comment.authorRole}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{comment.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{comment.content}</p>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                      hasLiked ? 'text-amber-700 font-semibold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes} {comment.likes === 1 ? 'upvote' : 'upvotes'}</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
            No comments yet. Be the first to share your thoughts on this guide!
          </div>
        )}
      </div>
    </section>
  );
};
