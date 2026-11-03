export type LanguageCode = 'en' | 'ar' | 'ckb' | 'kmr' | 'tr';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ReportType = 'lost' | 'found';
export type ReportStatus = 'open' | 'matched' | 'resolved' | 'closed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  avatar_url?: string;
  bio?: string;
  city?: string;
  preferred_language?: LanguageCode;
  preferred_theme?: ThemeMode;
  created_at: string;
  reports_count?: number;
  resolved_count?: number;
  unread_notifications?: number;
}

export interface Report {
  id: string;
  user_id: string;
  type: ReportType;
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  date_occurred: string;
  primary_image?: string;
  secret_verification_detail?: string;
  has_secret_detail?: boolean;
  contact_preference: string;
  preferred_language: string;
  status: ReportStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_avatar?: string;
  author_role?: string;
  author_joined?: string;
  likes_count: number;
  comments_count: number;
  claims_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  images?: string[];
}

export interface Comment {
  id: string;
  report_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar?: string;
  author_role?: string;
}

export interface Claim {
  id: string;
  report_id: string;
  claimant_id: string;
  explanation: string;
  evidence_details?: string;
  evidence_image?: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn';
  decision_reason?: string;
  created_at: string;
  updated_at: string;
  claimant_name?: string;
  claimant_avatar?: string;
  claimant_email?: string;
  report_title?: string;
  report_type?: ReportType;
  report_image?: string;
  report_status?: ReportStatus;
}

export interface Conversation {
  id: string;
  report_id?: string;
  report_title?: string;
  report_type?: ReportType;
  other_user_id: string;
  other_user_name: string;
  other_user_avatar?: string;
  last_message_content?: string;
  last_message_time?: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_name: string;
  sender_avatar?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'comment' | 'message' | 'claim_submitted' | 'claim_status' | 'report_status' | 'like';
  title: string;
  message: string;
  link?: string;
  is_read: number;
  created_at: string;
}

export interface ContentReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  reporter_email: string;
  target_type: 'report' | 'comment' | 'user';
  target_id: string;
  reason: string;
  details: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'actioned';
  moderator_notes?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  moderator_id: string;
  moderator_name: string;
  action_type: string;
  target_id: string;
  details: string;
  created_at: string;
}
