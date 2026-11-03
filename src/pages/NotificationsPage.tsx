import React, { useState, useEffect } from 'react';
import { Notification } from '../types/index.js';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import {
  Bell,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Heart,
  Package,
} from 'lucide-react';

interface NotificationsPageProps {
  onNavigateToReport: (reportId: string) => void;
  onNavigateToMessages: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onNavigateToReport,
  onNavigateToMessages,
}) => {
  const { t } = useLanguage();
  const { token, refreshUser } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('/api/notifications/read-all', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
        refreshUser();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (notif: Notification) => {
    // Mark as read
    if (!notif.is_read) {
      fetch(`/api/notifications/${notif.id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, is_read: 1 } : n))
      );
      refreshUser();
    }

    if (notif.link) {
      if (notif.link.startsWith('/reports/')) {
        const reportId = notif.link.split('/reports/')[1].split('?')[0];
        onNavigateToReport(reportId);
      } else if (notif.link.startsWith('/messages')) {
        onNavigateToMessages();
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'claim_submitted':
      case 'claim_status':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Package className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-600" />
          <span>{t.notifications.title}</span>
        </h1>

        {notifications.some((n) => !n.is_read) && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t.notifications.markAllRead}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            {t.notifications.noNotifications}
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer ${
                notif.is_read
                  ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  : 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-medium'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {notif.created_at.split('T')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.is_read && (
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
