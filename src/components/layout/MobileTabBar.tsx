import React from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import { useAuth } from '../../context/AuthContext.js';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

interface MobileTabBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCreate: () => void;
  unreadMessagesCount?: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCreate,
  unreadMessagesCount = 0,
}) => {
  const { t } = useLanguage();
  const { user, openAuthModal } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {/* Home */}
        <button
          onClick={() => setCurrentTab('feed')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
            currentTab === 'feed'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label={t.nav.home}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">{t.nav.home}</span>
        </button>

        {/* Explore */}
        <button
          onClick={() => setCurrentTab('explore')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
            currentTab === 'explore'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label={t.nav.explore}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">{t.nav.explore}</span>
        </button>

        {/* Create Action */}
        <button
          onClick={() => {
            if (!user) {
              openAuthModal('register');
            } else {
              onOpenCreate();
            }
          }}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-white -mt-4 group focus:outline-none"
          aria-label={t.nav.createReport}
        >
          <div className="w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-active:scale-95 transition-transform">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {t.nav.createReport}
          </span>
        </button>

        {/* Messages */}
        <button
          onClick={() => {
            if (!user) openAuthModal('login');
            else setCurrentTab('messages');
          }}
          className={`relative min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
            currentTab === 'messages'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label={t.nav.messages}
        >
          <MessageSquare className="w-5 h-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-rose-500" />
          )}
          <span className="text-[10px] tracking-tight mt-1">{t.nav.messages}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            if (!user) openAuthModal('login');
            else setCurrentTab('profile');
          }}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
            currentTab === 'profile' || currentTab === 'settings'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-label={t.nav.profile}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">{t.nav.profile}</span>
        </button>
      </div>
    </div>
  );
};
