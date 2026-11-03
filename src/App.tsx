/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { Navbar } from './components/layout/Navbar.js';
import { MobileTabBar } from './components/layout/MobileTabBar.js';
import { HomePage } from './pages/HomePage.js';
import { ReportDetailPage } from './pages/ReportDetailPage.js';
import { CreateReportModal } from './components/reports/CreateReportModal.js';
import { ClaimsModal } from './pages/ClaimsModal.js';
import { SafetyModal } from './pages/SafetyModal.js';
import { SafetyGuidelinesModal } from './pages/SafetyGuidelinesModal.js';
import { MessagesPage } from './pages/MessagesPage.js';
import { NotificationsPage } from './pages/NotificationsPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { AdminPage } from './pages/AdminPage.js';
import { AuthModal } from './components/auth/AuthModal.js';
import { Report } from './types/index.js';

function MainApp() {
  const { t } = useLanguage();
  const { user, token } = useAuth();

  const [currentTab, setCurrentTab] = useState<string>('feed');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [claimData, setClaimData] = useState<{ reportId: string; reportTitle: string } | null>(null);
  const [safetyData, setSafetyData] = useState<{
    targetType: 'report' | 'user';
    targetId: string;
    name?: string;
  } | null>(null);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  // Unread counts state
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    if (token) {
      fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.unreadCount !== undefined) {
            setUnreadNotifications(data.unreadCount);
          }
        })
        .catch(() => {});
    } else {
      setUnreadNotifications(0);
    }
  }, [token, currentTab]);

  const handleSelectReport = (report: Report) => {
    setSelectedReportId(report.id);
  };

  const handleOpenClaim = (report: Report) => {
    setClaimData({ reportId: report.id, reportTitle: report.title });
  };

  const handleOpenSafety = (
    targetType: 'report' | 'user',
    targetId: string,
    name?: string
  ) => {
    setSafetyData({ targetType, targetId, name });
  };

  const handleStartConversation = async (recipientId: string, reportId: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId, reportId }),
      });
      if (res.ok) {
        const data = await res.json();
        setActiveConversationId(data.conversationId);
        setSelectedReportId(null);
        setCurrentTab('messages');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigateToReportFromNotif = (reportId: string) => {
    setSelectedReportId(reportId);
  };

  const handleNavigateToMessagesFromNotif = () => {
    setSelectedReportId(null);
    setCurrentTab('messages');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Header */}
      <Navbar
        currentTab={selectedReportId ? '' : currentTab}
        setCurrentTab={(tab) => {
          setSelectedReportId(null);
          setCurrentTab(tab);
        }}
        onOpenCreate={() => setIsCreateOpen(true)}
        unreadCount={unreadNotifications}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedReportId ? (
          <ReportDetailPage
            reportId={selectedReportId}
            onBack={() => setSelectedReportId(null)}
            onOpenClaim={handleOpenClaim}
            onOpenSafety={handleOpenSafety}
            onStartConversation={handleStartConversation}
            onReportUpdated={() => {}}
          />
        ) : (
          <>
            {currentTab === 'feed' && (
              <HomePage
                initialTypeFilter="all"
                onSelectReport={handleSelectReport}
                onOpenCreate={() => setIsCreateOpen(true)}
              />
            )}

            {currentTab === 'explore' && (
              <HomePage
                initialTypeFilter="all"
                onSelectReport={handleSelectReport}
                onOpenCreate={() => setIsCreateOpen(true)}
              />
            )}

            {currentTab === 'lost' && (
              <HomePage
                initialTypeFilter="lost"
                onSelectReport={handleSelectReport}
                onOpenCreate={() => setIsCreateOpen(true)}
              />
            )}

            {currentTab === 'found' && (
              <HomePage
                initialTypeFilter="found"
                onSelectReport={handleSelectReport}
                onOpenCreate={() => setIsCreateOpen(true)}
              />
            )}

            {currentTab === 'saved' && (
              <ProfilePage
                onSelectReport={handleSelectReport}
                initialTab="saved"
              />
            )}

            {currentTab === 'messages' && (
              <MessagesPage initialConversationId={activeConversationId} />
            )}

            {currentTab === 'notifications' && (
              <NotificationsPage
                onNavigateToReport={handleNavigateToReportFromNotif}
                onNavigateToMessages={handleNavigateToMessagesFromNotif}
              />
            )}

            {currentTab === 'profile' && (
              <ProfilePage onSelectReport={handleSelectReport} initialTab="myReports" />
            )}

            {currentTab === 'settings' && <SettingsPage />}

            {currentTab === 'admin' && <AdminPage />}
          </>
        )}
      </main>

      {/* Clean Footer (No telemetry or mock clutter) */}
      <footer className="hidden sm:block border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {t.common.appName} — {t.common.tagline}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsGuidelinesOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t.safety.communityGuidelinesTitle}
            </button>
            <button
              onClick={() => setCurrentTab('settings')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t.nav.settings}
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Tab Bar for Touch Ergonomics */}
      <MobileTabBar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedReportId(null);
          setCurrentTab(tab);
        }}
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* Modals & Dialogs */}
      <AuthModal onOpenGuidelines={() => setIsGuidelinesOpen(true)} />

      <CreateReportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(id) => {
          setSelectedReportId(id);
        }}
        initialType={currentTab === 'found' ? 'found' : 'lost'}
      />

      {claimData && (
        <ClaimsModal
          isOpen={Boolean(claimData)}
          onClose={() => setClaimData(null)}
          reportId={claimData.reportId}
          reportTitle={claimData.reportTitle}
          onClaimSubmitted={() => {}}
        />
      )}

      {safetyData && (
        <SafetyModal
          isOpen={Boolean(safetyData)}
          onClose={() => setSafetyData(null)}
          targetType={safetyData.targetType}
          targetId={safetyData.targetId}
          targetName={safetyData.name}
        />
      )}

      <SafetyGuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
