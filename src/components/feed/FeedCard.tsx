import React from 'react';
import { Report } from '../../types/index.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { useAuth } from '../../context/AuthContext.js';
import {
  MapPin,
  Calendar,
  Heart,
  Bookmark,
  MessageSquare,
  ShieldCheck,
  Package,
} from 'lucide-react';

interface FeedCardProps {
  report: Report;
  onSelect: (report: Report) => void;
  onToggleLike: (reportId: string, e: React.MouseEvent) => void;
  onToggleBookmark: (reportId: string, e: React.MouseEvent) => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  report,
  onSelect,
  onToggleLike,
  onToggleBookmark,
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return t.reportDetail.statusOpen;
      case 'matched':
        return t.reportDetail.statusMatched;
      case 'resolved':
        return t.reportDetail.statusResolved;
      case 'closed':
        return t.reportDetail.statusClosed;
      default:
        return status;
    }
  };

  const getCategoryLabel = (cat: string) => {
    return (t.categories as any)[cat] || cat;
  };

  const isLost = report.type === 'lost';

  return (
    <article
      onClick={() => onSelect(report)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Visual Header / Image Slot */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {report.primary_image ? (
          <img
            src={report.primary_image}
            alt={report.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/80 dark:from-slate-800 dark:to-slate-900/60 text-slate-400 dark:text-slate-500">
            <Package className="w-10 h-10 stroke-[1.5] mb-1.5 opacity-60" />
            <span className="text-xs font-medium tracking-tight">
              {getCategoryLabel(report.category)}
            </span>
          </div>
        )}

        {/* Clean Type indicator (unboxed, high-contrast marker) */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md shadow-xs ${
              isLost
                ? 'bg-rose-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isLost ? t.reportForm.itemLost : t.reportForm.itemFound}
          </span>
        </div>

        {/* Status indicator if resolved or in review */}
        {report.status !== 'open' && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-900/85 text-white backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{getStatusLabel(report.status)}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line with typographic separators (Zero-Pill discipline) */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {getCategoryLabel(report.category)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{report.city || report.location}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{report.date_occurred}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {report.title}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* Card Footer: Author + Interactive Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 truncate pr-2">
            {report.author_avatar ? (
              <img
                src={report.author_avatar}
                alt={report.author_name}
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-[10px] font-bold shrink-0">
                {report.author_name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
              {report.author_name}
            </span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* Comment count */}
            <span className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="tabular-nums">{report.comments_count}</span>
            </span>

            {/* Like */}
            <button
              onClick={(e) => onToggleLike(report.id, e)}
              className={`min-h-[32px] inline-flex items-center gap-1 focus:outline-none transition-colors ${
                report.is_liked
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : 'hover:text-rose-600 dark:hover:text-rose-400'
              }`}
              aria-label="Like report"
            >
              <Heart
                className={`w-3.5 h-3.5 ${report.is_liked ? 'fill-current' : ''}`}
              />
              <span className="tabular-nums">{report.likes_count}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => onToggleBookmark(report.id, e)}
              className={`min-h-[32px] inline-flex items-center focus:outline-none transition-colors ${
                report.is_bookmarked
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              aria-label="Save report"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${report.is_bookmarked ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
