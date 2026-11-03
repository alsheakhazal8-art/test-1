import React from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import { Search, MapPin, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOrder: string;
  setSortOrder: (sort: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  cityFilter,
  setCityFilter,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  onClearFilters,
  hasActiveFilters,
}) => {
  const { t } = useLanguage();

  const typeButtons = [
    { id: 'all', label: t.feed.allReports },
    { id: 'lost', label: t.feed.lostFeed },
    { id: 'found', label: t.feed.foundFeed },
    { id: 'resolved', label: t.feed.resolvedFeed },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search Bar & Primary Type Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Interactive Segmented Control for Types */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto shrink-0">
          {typeButtons.map((btn) => {
            const active = typeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setTypeFilter(btn.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap focus:outline-none ${
                  active
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Search Query Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.feed.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors"
          />
        </div>
      </div>

      {/* Secondary Filters Strip (Category, City, Sort) */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">{t.feed.allCategories}</option>
            {Object.entries(t.categories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>

        {/* City Filter Input */}
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder={t.feed.cityFilter}
            className="pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40 sm:w-48"
          />
        </div>

        {/* Sort Order Dropdown */}
        <div className="ml-auto flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="newest">{t.feed.sortNewest}</option>
            <option value="oldest">{t.feed.sortOldest}</option>
            <option value="views">{t.feed.sortMostViewed}</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors focus:outline-none font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.feed.clearFilters}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
