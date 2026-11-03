import React, { useState, useEffect } from 'react';
import { Report, Claim, User } from '../types/index.js';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import { FeedCard } from '../components/feed/FeedCard.js';
import {
  User as UserIcon,
  MapPin,
  Calendar,
  Edit3,
  Bookmark,
  Package,
  ShieldCheck,
  CheckCircle,
  X,
} from 'lucide-react';

interface ProfilePageProps {
  onSelectReport: (report: Report) => void;
  initialTab?: 'myReports' | 'saved' | 'myClaims';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onSelectReport,
  initialTab = 'myReports',
}) => {
  const { t } = useLanguage();
  const { user, token, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'myReports' | 'saved' | 'myClaims'>(initialTab);
  const [reports, setReports] = useState<Report[]>([]);
  const [savedReports, setSavedReports] = useState<Report[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditBio(user.bio || '');
      setEditCity(user.city || '');
      setEditAvatar(user.avatar_url || '');
    }
  }, [user]);

  const fetchData = async () => {
    if (!token || !user) return;
    setIsLoading(true);
    try {
      // My reports
      const myRes = await fetch(`/api/reports?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (myRes.ok) {
        const data = await myRes.json();
        setReports(data.reports || []);
      }

      // Bookmarked reports
      const savedRes = await fetch(`/api/reports?bookmarkedBy=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (savedRes.ok) {
        const data = await savedRes.json();
        setSavedReports(data.reports || []);
      }

      // My claims
      const claimsRes = await fetch('/api/claims/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (claimsRes.ok) {
        const data = await claimsRes.json();
        setClaims(data.claims || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, user?.id]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          bio: editBio,
          city: editCity,
          avatar_url: editAvatar,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        updateUser(data.user);
        setSaveSuccess(true);
        setTimeout(() => {
          setIsEditing(false);
          setSaveSuccess(false);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-indigo-600/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                {user.role === 'admin' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    ADMIN
                  </span>
                )}
              </div>

              {user.bio ? (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                  {user.bio}
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-400 italic">No biography provided</p>
              )}

              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                {user.city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{user.city}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined {user.created_at ? user.created_at.split('T')[0] : '2026'}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.profile.editProfile}</span>
          </button>
        </div>

        {/* Real Metrics Strip (No fake counts) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {reports.length}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.profile.reportsPublished}
            </p>
          </div>

          <div>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {reports.filter((r) => r.status === 'resolved').length}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.profile.itemsResolved}
            </p>
          </div>

          <div>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {claims.length}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.profile.myClaims}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('myReports')}
          className={`pb-3 px-1 text-xs font-semibold border-b-2 transition-colors focus:outline-none ${
            activeTab === 'myReports'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.profile.myReports} ({reports.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-1 text-xs font-semibold border-b-2 transition-colors focus:outline-none ${
            activeTab === 'saved'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.profile.savedReports} ({savedReports.length})
        </button>

        <button
          onClick={() => setActiveTab('myClaims')}
          className={`pb-3 px-1 text-xs font-semibold border-b-2 transition-colors focus:outline-none ${
            activeTab === 'myClaims'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.profile.myClaims} ({claims.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'myReports' && (
        <>
          {reports.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              You haven't published any lost or found reports yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <FeedCard
                  key={report.id}
                  report={report}
                  onSelect={onSelectReport}
                  onToggleLike={() => {}}
                  onToggleBookmark={() => {}}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'saved' && (
        <>
          {savedReports.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              No saved items in your bookmarks.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedReports.map((report) => (
                <FeedCard
                  key={report.id}
                  report={report}
                  onSelect={onSelectReport}
                  onToggleLike={() => {}}
                  onToggleBookmark={() => {}}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'myClaims' && (
        <div className="space-y-4">
          {claims.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              You haven't submitted any ownership claims.
            </div>
          ) : (
            claims.map((claim) => (
              <div
                key={claim.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {claim.report_title}
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
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {claim.explanation}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {claim.created_at.split('T')[0]}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {t.profile.editProfile}
            </h2>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.auth.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  City or Region
                </label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  placeholder={t.profile.cityPlaceholder}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder={t.profile.bioPlaceholder}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  {t.profile.saveProfile}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
