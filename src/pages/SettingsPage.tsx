import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { useTheme } from '../context/ThemeContext.js';
import { useAuth } from '../context/AuthContext.js';
import { LanguageCode } from '../types/index.js';
import {
  Settings,
  Globe,
  Sun,
  Moon,
  Monitor,
  Lock,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { lang, setLang, t, languages } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { token, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError(t.auth.passwordMinLength);
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch('/api/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password update failed');

      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Error updating password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleExportData = async () => {
    try {
      const res = await fetch('/api/users/data-export', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `findora-my-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm(t.settings.deleteAccountConfirm)) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/users/account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        logout();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-indigo-600" />
        <span>{t.settings.title}</span>
      </h1>

      <div className="space-y-6">
        {/* Language Selection Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.interfaceLanguage}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(languages) as LanguageCode[]).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`p-3 rounded-xl border text-left transition-all focus:outline-none ${
                    active
                      ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <p className="text-xs font-semibold">{languages[code].nativeName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{languages[code].name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Mode Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Sun className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.themeMode}
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all focus:outline-none ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-xs">{t.settings.themeLight}</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all focus:outline-none ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Moon className="w-5 h-5 text-slate-400" />
              <span className="text-xs">{t.settings.themeDark}</span>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all focus:outline-none ${
                theme === 'system'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Monitor className="w-5 h-5 text-slate-400" />
              <span className="text-xs">{t.settings.themeSystem}</span>
            </button>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.changePassword}
            </h2>
          </div>

          {passwordSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Password updated successfully!</span>
            </div>
          )}

          {passwordError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.settings.currentPassword}
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.settings.newPassword}
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs"
            >
              {isUpdatingPassword ? t.common.loading : t.settings.changePassword}
            </button>
          </form>
        </div>

        {/* Export Data Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Download className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.exportData}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            {t.settings.exportDesc}
          </p>
          <button
            onClick={handleExportData}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{t.settings.downloadExport}</span>
          </button>
        </div>

        {/* Delete Account Card */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-base font-bold text-rose-900 dark:text-rose-200">
              {t.settings.deleteAccount}
            </h2>
          </div>
          <p className="text-xs text-rose-700/80 dark:text-rose-300/80 mb-4 leading-relaxed">
            {t.settings.deleteAccountDesc}
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? t.common.loading : t.settings.deleteAccount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
