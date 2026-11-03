import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import { ContentReport, AuditLog } from '../types/index.js';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  Clock,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, token } = useAuth();

  const [stats, setStats] = useState<any>(null);
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'audit'>('queue');
  const [moderatorNotes, setModeratorNotes] = useState<{ [id: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminData = async () => {
    if (!token || user?.role !== 'admin') return;
    setIsLoading(true);
    try {
      const statsRes = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }

      const queueRes = await fetch('/api/admin/reports?status=pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (queueRes.ok) {
        const data = await queueRes.json();
        setReports(data.reports || []);
      }

      const logsRes = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (logsRes.ok) {
        const data = await logsRes.json();
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token, user]);

  const handleResolveFlag = async (reportId: string, status: 'reviewed' | 'dismissed' | 'actioned') => {
    try {
      const notes = moderatorNotes[reportId] || '';
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, moderator_notes: notes }),
      });

      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500 mt-1">Only server-verified administrators can access this area.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-indigo-600" />
          <span>{t.admin.dashboardTitle}</span>
        </h1>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold rounded-lg">
          Verified Administrator
        </span>
      </div>

      {/* Real Statistics Calculated from DB */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {stats.totalUsers}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.totalUsers}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {stats.totalReports}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.totalReports}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">
              {stats.lostCount}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.lostItems}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {stats.foundCount}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.foundItems}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {stats.resolvedCount}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.resolvedItems}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {stats.pendingReports}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.admin.flaggedReports}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-3 px-1 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'queue'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.admin.moderationQueue} ({reports.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-1 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.admin.auditLogs} ({auditLogs.length})
        </button>
      </div>

      {/* Moderation Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              {t.admin.noFlaggedContent}
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      {report.target_type}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      Reason: {report.reason}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {report.created_at.split('T')[0]}
                  </span>
                </div>

                {report.details && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    "{report.details}"
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>
                    {t.admin.reportedBy}: {report.reporter_name} ({report.reporter_email})
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResolveFlag(report.id, 'dismissed')}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      {t.admin.actionDismiss}
                    </button>
                    <button
                      onClick={() => handleResolveFlag(report.id, 'actioned')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      {t.admin.actionReview}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {auditLogs.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">No moderation audit logs recorded yet.</div>
          ) : (
            auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {log.details}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    By Moderator: {log.moderator_name}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {log.created_at.replace('T', ' ').substring(0, 16)}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
