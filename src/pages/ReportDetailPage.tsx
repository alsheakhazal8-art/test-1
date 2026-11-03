import React, { useState, useEffect } from 'react';
import { Report, Comment, Claim } from '../types/index.js';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Bookmark,
  Share2,
  ShieldAlert,
  ShieldCheck,
  MessageSquare,
  Send,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  Flag,
} from 'lucide-react';

interface ReportDetailPageProps {
  reportId: string;
  onBack: () => void;
  onOpenClaim: (report: Report) => void;
  onOpenSafety: (targetType: 'report' | 'user', targetId: string, name?: string) => void;
  onStartConversation: (recipientId: string, reportId: string) => void;
  onReportUpdated?: () => void;
}

export const ReportDetailPage: React.FC<ReportDetailPageProps> = ({
  reportId,
  onBack,
  onOpenClaim,
  onOpenSafety,
  onStartConversation,
  onReportUpdated,
}) => {
  const { t, lang } = useLanguage();
  const { user, token, openAuthModal } = useAuth();

  const [report, setReport] = useState<Report | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'claims'>('details');
  const [copyNotice, setCopyNotice] = useState(false);

  const fetchReport = async () => {
    try {
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/reports/${reportId}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setReport(data.report);
      }
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/reports/${reportId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const fetchClaims = async () => {
    if (!token) return;
    try {
      const res = await fetch(`/api/reports/${reportId}/claims`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setClaims(data.claims || []);
      }
    } catch (err) {
      console.error('Failed to load claims:', err);
    }
  };

  useEffect(() => {
    fetchReport();
    fetchComments();
    fetchClaims();
  }, [reportId, token]);

  const handleToggleLike = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    try {
      const res = await fetch(`/api/reports/${reportId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReport((prev) =>
          prev
            ? {
                ...prev,
                is_liked: data.liked,
                likes_count: data.liked ? prev.likes_count + 1 : prev.likes_count - 1,
              }
            : null
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    try {
      const res = await fetch(`/api/reports/${reportId}/bookmark`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReport((prev) =>
          prev ? { ...prev, is_bookmarked: data.bookmarked } : null
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: report?.title,
        text: report?.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotice(true);
      setTimeout(() => setCopyNotice(false), 2000);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
      return;
    }
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, data.comment]);
        setNewComment('');
        setReport((prev) =>
          prev ? { ...prev, comments_count: prev.comments_count + 1 } : null
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setReport((prev) =>
          prev ? { ...prev, comments_count: Math.max(0, prev.comments_count - 1) } : null
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateClaimStatus = async (claimId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/claims/${claimId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchClaims();
        fetchReport();
        if (onReportUpdated) onReportUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkResolved = async () => {
    if (!confirm(t.reportDetail.markAsResolved + '?')) return;
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'resolved' }),
      });
      if (res.ok) {
        fetchReport();
        if (onReportUpdated) onReportUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReport = async () => {
    if (!confirm(t.reportDetail.deleteReportConfirm)) return;
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        if (onReportUpdated) onReportUpdated();
        onBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Report not found
        </h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl"
        >
          {t.common.back}
        </button>
      </div>
    );
  }

  const isOwner = user?.id === report.user_id;
  const isAdmin = user?.role === 'admin';
  const isLost = report.type === 'lost';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>{t.common.back}</span>
      </button>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm overflow-hidden">
        {/* Hero Image Section */}
        {report.primary_image ? (
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-slate-100 dark:bg-slate-800">
            <img
              src={report.primary_image}
              alt={report.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg shadow-md ${
                  isLost ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isLost ? t.reportForm.itemLost : t.reportForm.itemFound}
              </span>
            </div>
            {report.status !== 'open' && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900/90 text-white backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    {report.status === 'resolved'
                      ? t.reportDetail.statusResolved
                      : t.reportDetail.statusMatched}
                  </span>
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-lg ${
                isLost ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              {isLost ? t.reportForm.itemLost : t.reportForm.itemFound}
            </span>
            {report.status !== 'open' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-900 text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {report.status === 'resolved'
                    ? t.reportDetail.statusResolved
                    : t.reportDetail.statusMatched}
                </span>
              </span>
            )}
          </div>
        )}

        {/* Content Container */}
        <div className="p-6 sm:p-8">
          {/* Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {(t.categories as any)[report.category] || report.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{report.city} ({report.location})</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {isLost ? t.reportDetail.lostOn : t.reportDetail.foundOn} {report.date_occurred}
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{report.views_count} {t.reportDetail.views}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {report.title}
          </h1>

          {/* Description */}
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-6">
            {report.description}
          </p>

          {/* Distinguishing Secret Verification Box (Owner or Admin only) */}
          {report.secret_verification_detail && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{t.reportDetail.secretDetailTitle}</span>
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-200 font-mono mt-1 bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/40">
                {report.secret_verification_detail}
              </p>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5">
                {t.reportDetail.secretDetailDesc}
              </p>
            </div>
          )}

          {/* Actions Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-slate-100 dark:border-slate-800 my-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleLike}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none ${
                  report.is_liked
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${report.is_liked ? 'fill-current' : ''}`} />
                <span className="tabular-nums">{report.likes_count}</span>
              </button>

              <button
                onClick={handleToggleBookmark}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none ${
                  report.is_bookmarked
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${report.is_bookmarked ? 'fill-current' : ''}`} />
                <span>{t.reportDetail.bookmark}</span>
              </button>

              <button
                onClick={handleShare}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none"
              >
                <Share2 className="w-4 h-4" />
                <span>{copyNotice ? 'Link Copied!' : t.reportDetail.share}</span>
              </button>
            </div>

            {/* Owner or Admin Controls vs Visitor CTAs */}
            <div className="flex items-center gap-2">
              {isOwner || isAdmin ? (
                <>
                  {report.status !== 'resolved' && (
                    <button
                      onClick={handleMarkResolved}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
                    >
                      {t.reportDetail.markAsResolved}
                    </button>
                  )}
                  <button
                    onClick={handleDeleteReport}
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors focus:outline-none"
                    aria-label={t.common.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (!user) openAuthModal('login');
                      else onStartConversation(report.user_id, report.id);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isLost ? t.reportDetail.contactOwner : t.reportDetail.contactFinder}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!user) openAuthModal('login');
                      else onOpenClaim(report);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
                  >
                    {t.reportDetail.claimItem}
                  </button>

                  <button
                    onClick={() => onOpenSafety('report', report.id, report.title)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors focus:outline-none"
                    aria-label={t.reportDetail.reportItem}
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Reporter Profile Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {report.author_avatar ? (
                <img
                  src={report.author_avatar}
                  alt={report.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">
                  {report.author_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {report.author_name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.reportDetail.memberSince}{' '}
                  {report.author_joined ? report.author_joined.split('T')[0] : '2026'}
                </p>
              </div>
            </div>
          </div>

          {/* Claims Section for Report Owner */}
          {(isOwner || isAdmin) && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.claims.claimsForReport} ({claims.length})
                </h3>
              </div>

              {claims.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 py-3">
                  {t.claims.noClaimsYet}
                </p>
              ) : (
                <div className="space-y-3">
                  {claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {claim.claimant_name || 'Claimant'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            claim.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : claim.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                        {claim.explanation}
                      </p>
                      {claim.evidence_details && (
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          <strong>Evidence: </strong> {claim.evidence_details}
                        </p>
                      )}

                      {/* Decision buttons */}
                      {claim.status === 'pending' && isOwner && (
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => handleUpdateClaimStatus(claim.id, 'accepted')}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{t.claims.acceptClaim}</span>
                          </button>
                          <button
                            onClick={() => handleUpdateClaimStatus(claim.id, 'rejected')}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 rounded-lg flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{t.claims.rejectClaim}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {t.reportDetail.commentsTitle} ({comments.length})
            </h3>

            {/* Comment List */}
            {comments.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-3">
                {t.reportDetail.noComments}
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {comment.author_name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {comment.created_at.split('T')[0]}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>

                    {(user?.id === comment.user_id || isAdmin) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-slate-400 hover:text-rose-500 focus:outline-none p-1"
                        aria-label="Delete comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t.reportDetail.addCommentPlaceholder}
                className="flex-1 px-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isPostingComment || !newComment.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.reportDetail.postComment}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
