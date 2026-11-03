import React, { useState, useEffect } from 'react';
import { Report } from '../types/index.js';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import { FeedCard } from '../components/feed/FeedCard.js';
import { FilterBar } from '../components/feed/FilterBar.js';
import {
  Package,
  PlusCircle,
  ShieldCheck,
  Search,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  initialTypeFilter?: string;
  onSelectReport: (report: Report) => void;
  onOpenCreate: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  initialTypeFilter = 'all',
  onSelectReport,
  onOpenCreate,
}) => {
  const { t } = useLanguage();
  const { user, token, openAuthModal } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    setTypeFilter(initialTypeFilter);
  }, [initialTypeFilter]);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter && typeFilter !== 'all') params.append('type', typeFilter);
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);
      if (cityFilter.trim()) params.append('city', cityFilter.trim());
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (sortOrder) params.append('sort', sortOrder);

      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/reports?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [typeFilter, categoryFilter, cityFilter, searchQuery, sortOrder, token]);

  const handleToggleLike = async (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId
              ? {
                  ...r,
                  is_liked: data.liked,
                  likes_count: data.liked ? r.likes_count + 1 : r.likes_count - 1,
                }
              : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, is_bookmarked: data.bookmarked } : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setCityFilter('');
    setSearchQuery('');
    setSortOrder('newest');
  };

  const hasActiveFilters =
    typeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    cityFilter !== '' ||
    searchQuery !== '' ||
    sortOrder !== 'newest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Community Hero Banner (shown to visitors or on top of feed) */}
      {!user && (
        <div className="relative rounded-3xl overflow-hidden mb-10 bg-slate-900 border border-slate-800 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Hero Left Content */}
            <div className="p-8 sm:p-12 lg:p-14 z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-indigo-400 uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.common.appName}</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 text-balance">
                {t.feed.welcomeHeading}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
                {t.feed.welcomeSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all focus:outline-none"
                >
                  {t.nav.register}
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all focus:outline-none"
                >
                  {t.nav.login}
                </button>
              </div>
            </div>

            {/* Hero Right Image Slot */}
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] w-full overflow-hidden">
              <img
                src="/src/assets/images/findora_hero_banner_1793277416407.jpg"
                alt="Findora Community Return"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* Filter and Discovery Bar */}
      <FilterBar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Community Reports Feed */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl h-80 border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : reports.length === 0 ? (
        /* Empty State (Strict adherence to RULE 1 & 9) */
        <div className="py-16 sm:py-24 px-6 text-center max-w-lg mx-auto bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4">
            <Package className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {hasActiveFilters ? t.feed.noResultsTitle : t.feed.emptyTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-sm mx-auto">
            {hasActiveFilters ? t.feed.noResultsSubtitle : t.feed.emptySubtitle}
          </p>
          {hasActiveFilters ? (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              {t.feed.clearFilters}
            </button>
          ) : (
            <button
              onClick={() => {
                if (!user) openAuthModal('register');
                else onOpenCreate();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.feed.emptyAction}</span>
            </button>
          )}
        </div>
      ) : (
        /* Feed Cards Grid */
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {reports.length} {t.feed.reportCount}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <FeedCard
                key={report.id}
                report={report}
                onSelect={onSelectReport}
                onToggleLike={handleToggleLike}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        </div>
      )}

      {/* How Findora Works (Educational Section below feed) */}
      <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.feed.howItWorks}
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            A trustworthy, privacy-respecting community workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {t.feed.step1Title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feed.step1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {t.feed.step2Title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feed.step2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {t.feed.step3Title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.feed.step3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
