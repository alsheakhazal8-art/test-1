import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '../types/index.js';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import {
  MessageSquare,
  Send,
  ShieldAlert,
  ArrowLeft,
  Package,
} from 'lucide-react';

interface MessagesPageProps {
  initialConversationId?: string | null;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({ initialConversationId }) => {
  const { t } = useLanguage();
  const { token, user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        if (!selectedConvoId && data.conversations.length > 0) {
          setSelectedConvoId(data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (convoId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/conversations/${convoId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000); // Polling for new chats
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (selectedConvoId) {
      fetchMessages(selectedConvoId);
      const msgInterval = setInterval(() => fetchMessages(selectedConvoId), 4000);
      return () => clearInterval(msgInterval);
    }
  }, [selectedConvoId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConvoId || !messageText.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch(`/api/conversations/${selectedConvoId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: messageText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]);
        setMessageText('');
        fetchConversations();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const activeConvo = conversations.find((c) => c.id === selectedConvoId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {t.messages.inboxTitle}
      </h1>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[700px] flex flex-col md:flex-row">
        {/* Left Column: Conversation List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col ${
            selectedConvoId ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {conversations.length} Active Chats
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                {t.messages.noConversations}
              </div>
            ) : (
              conversations.map((convo) => {
                const isSelected = convo.id === selectedConvoId;
                return (
                  <button
                    key={convo.id}
                    onClick={() => setSelectedConvoId(convo.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors focus:outline-none ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {convo.other_user_avatar ? (
                      <img
                        src={convo.other_user_avatar}
                        alt={convo.other_user_name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                        {convo.other_user_name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {convo.other_user_name}
                        </span>
                        {convo.unread_count > 0 && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        )}
                      </div>
                      {convo.report_title && (
                        <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 truncate mb-1 flex items-center gap-1">
                          <Package className="w-3 h-3 shrink-0" />
                          <span>{convo.report_title}</span>
                        </p>
                      )}
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {convo.last_message_content || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        <div
          className={`flex-1 flex flex-col ${
            !selectedConvoId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {selectedConvoId && activeConvo ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConvoId(null)}
                    className="md:hidden p-1 text-slate-400 hover:text-slate-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {activeConvo.other_user_avatar ? (
                    <img
                      src={activeConvo.other_user_avatar}
                      alt={activeConvo.other_user_name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                      {activeConvo.other_user_name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {activeConvo.other_user_name}
                    </h3>
                    {activeConvo.report_title && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {t.messages.aboutItem} {activeConvo.report_title}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Safety Banner */}
              <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 border-b border-amber-200/50 dark:border-amber-900/30 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{t.messages.safetyReminder}</span>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Send a message to introduce yourself and verify details safely.
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.sender_id === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                          {msg.created_at.split('T')[1]?.substring(0, 5)}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2"
              >
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={t.messages.typeMessage}
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim() || isSending}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.messages.sendMessage}</span>
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 stroke-[1.5] mb-2 opacity-40" />
              <p className="text-xs">{t.messages.selectConversation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
