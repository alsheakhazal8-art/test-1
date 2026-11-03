import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { useAuth } from '../../context/AuthContext.js';
import { LanguageCode } from '../../types/index.js';
import {
  Search,
  PlusCircle,
  Sun,
  Moon,
  Globe,
  Bell,
  MessageSquare,
  User as UserIcon,
  Bookmark,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCreate: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCreate,
  unreadCount = 0,
}) => {
  const { lang, setLang, t, dir, languages } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, openAuthModal } = useAuth();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'feed', label: t.nav.home },
    { id: 'explore', label: t.nav.explore },
    { id: 'lost', label: t.nav.lostItems },
    { id: 'found', label: t.nav.foundItems },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element, no clutter) */}
          <button
            onClick={() => setCurrentTab('feed')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
            aria-label={t.common.appName}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              {t.common.appName}
            </span>
          </button>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus:outline-none ${
                    active
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Essential Controls & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline font-sans">{languages[lang].nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute mt-2 w-44 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                    dir === 'rtl' ? 'left-0' : 'right-0'
                  }`}
                >
                  {(Object.keys(languages) as LanguageCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left ${
                        lang === code
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <span>{languages[code].nativeName}</span>
                      <span className="text-[10px] text-slate-400">{languages[code].name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <>
                {/* Notifications Button */}
                <button
                  onClick={() => setCurrentTab('notifications')}
                  className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label={t.nav.notifications}
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </button>

                {/* Messages Button */}
                <button
                  onClick={() => setCurrentTab('messages')}
                  className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label={t.nav.messages}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {/* User Menu */}
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                    aria-label="User profile menu"
                  >
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block mr-1" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className={`absolute mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 ${
                        dir === 'rtl' ? 'left-0' : 'right-0'
                      }`}
                    >
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentTab('profile');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors text-left"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>{t.nav.profile}</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('saved');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors text-left"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{t.nav.saved}</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('settings');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors text-left"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>{t.nav.settings}</span>
                      </button>

                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            setCurrentTab('admin');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors text-left font-medium"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t.nav.admin}</span>
                        </button>
                      )}

                      <div className="border-t border-slate-100 dark:border-slate-700/60 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t.nav.logout}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none whitespace-nowrap"
              >
                {t.nav.login}
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal('register');
                } else {
                  onOpenCreate();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/20 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t.nav.createReport}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
