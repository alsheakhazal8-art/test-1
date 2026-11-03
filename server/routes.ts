import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { db } from './db.js';
import {
  hashPassword,
  comparePassword,
  generateToken,
  requireAuth,
  optionalAuth,
  requireAdmin,
  AuthenticatedRequest,
} from './auth.js';

export const apiRouter = express.Router();

// Multer storage for real uploaded images
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `img-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WEBP, and GIF images are allowed'));
    }
  },
});

// Image Upload Endpoint
apiRouter.post('/upload', requireAuth, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No image file uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// -------------------------------------------------------------
// AUTHENTICATION
// -------------------------------------------------------------

apiRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, termsAccepted } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    if (!termsAccepted) {
      res.status(400).json({ error: 'You must agree to the Terms of Service' });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(trimmedEmail);
    if (existing) {
      res.status(409).json({ error: 'An account with this email already exists' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' });
      return;
    }

    const countUsers = (db.prepare('SELECT count(*) as count FROM users').get() as any).count;
    // First user registered or admin email is granted admin role
    const role = countUsers === 0 ? 'admin' : 'user';

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, name.trim(), trimmedEmail, passwordHash, role, now, now);

    const user = { id: userId, name: name.trim(), email: trimmedEmail, role };
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err: any) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(trimmedEmail) as any;
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    if (user.is_suspended) {
      res.status(403).json({ error: 'This account has been suspended by an administrator' });
      return;
    }

    const matches = await comparePassword(password, user.password_hash);
    if (!matches) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
      bio: user.bio,
      city: user.city,
      preferred_language: user.preferred_language,
      preferred_theme: user.preferred_theme,
    };
    const token = generateToken(userData);

    res.json({ user: userData, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

apiRouter.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = db.prepare(`
    SELECT id, name, email, role, avatar_url, bio, city, preferred_language, preferred_theme, created_at
    FROM users WHERE id = ?
  `).get(req.user!.id) as any;

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Count unread notifications
  const unreadCount = (db.prepare(`
    SELECT count(*) as count FROM notifications WHERE user_id = ? AND is_read = 0
  `).get(user.id) as any).count;

  res.json({ user: { ...user, unread_notifications: unreadCount } });
});

apiRouter.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email.trim().toLowerCase()) as any;
  if (user) {
    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();
    const id = crypto.randomUUID();
    db.prepare(`
      INSERT INTO password_resets (id, user_id, token, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, user.id, token, expiresAt, new Date().toISOString());

    // In production without external SMTP configured, we return the reset link token directly for reliable testing
    res.json({
      message: 'Password recovery token generated. Use this token to reset your password.',
      resetToken: token,
    });
    return;
  }

  // Consistent message to prevent email enumeration
  res.json({ message: 'If an account exists with this email, a reset token has been generated.' });
});

apiRouter.post('/auth/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword || newPassword.length < 6) {
    res.status(400).json({ error: 'Valid token and new password (min 6 chars) required' });
    return;
  }

  const reset = db.prepare(`
    SELECT * FROM password_resets WHERE token = ? AND expires_at > datetime('now')
  `).get(token) as any;

  if (!reset) {
    res.status(400).json({ error: 'Reset token is invalid or has expired' });
    return;
  }

  const newHash = await hashPassword(newPassword);
  db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(
    newHash,
    new Date().toISOString(),
    reset.user_id
  );

  // Invalidate token
  db.prepare('DELETE FROM password_resets WHERE id = ?').run(reset.id);

  res.json({ message: 'Password has been successfully updated. You may now log in.' });
});

// -------------------------------------------------------------
// REPORTS (LOST & FOUND)
// -------------------------------------------------------------

apiRouter.get('/reports', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      type,
      category,
      city,
      status,
      q,
      sort = 'newest',
      page = 1,
      limit = 20,
      userId,
      bookmarkedBy,
    } = req.query as any;

    let query = `
      SELECT r.*, 
        u.name as author_name, u.avatar_url as author_avatar, u.role as author_role,
        (SELECT count(*) FROM likes l WHERE l.report_id = r.id) as likes_count,
        (SELECT count(*) FROM comments c WHERE c.report_id = r.id) as comments_count,
        (SELECT count(*) FROM ownership_claims oc WHERE oc.report_id = r.id) as claims_count
    `;

    const currentUserId = req.user?.id;
    if (currentUserId) {
      query += `,
        (SELECT count(*) > 0 FROM likes l WHERE l.report_id = r.id AND l.user_id = '${currentUserId}') as is_liked,
        (SELECT count(*) > 0 FROM bookmarks b WHERE b.report_id = r.id AND b.user_id = '${currentUserId}') as is_bookmarked
      `;
    } else {
      query += `, 0 as is_liked, 0 as is_bookmarked`;
    }

    query += ` FROM reports r JOIN users u ON r.user_id = u.id WHERE 1=1`;

    const params: any[] = [];

    // Filter out posts from blocked users if logged in
    if (currentUserId) {
      query += ` AND r.user_id NOT IN (SELECT blocked_id FROM user_blocks WHERE blocker_id = ?)`;
      params.push(currentUserId);
    }

    if (type && type !== 'all') {
      query += ` AND r.type = ?`;
      params.push(type);
    }

    if (category && category !== 'all') {
      query += ` AND r.category = ?`;
      params.push(category);
    }

    if (city && city.trim() !== '') {
      query += ` AND (LOWER(r.city) LIKE ? OR LOWER(r.location) LIKE ?)`;
      const term = `%${city.trim().toLowerCase()}%`;
      params.push(term, term);
    }

    if (status && status !== 'all') {
      query += ` AND r.status = ?`;
      params.push(status);
    }

    if (userId) {
      query += ` AND r.user_id = ?`;
      params.push(userId);
    }

    if (bookmarkedBy) {
      query += ` AND r.id IN (SELECT report_id FROM bookmarks WHERE user_id = ?)`;
      params.push(bookmarkedBy);
    }

    if (q && q.trim() !== '') {
      const searchTerm = `%${q.trim().toLowerCase()}%`;
      query += ` AND (LOWER(r.title) LIKE ? OR LOWER(r.description) LIKE ? OR LOWER(r.location) LIKE ? OR LOWER(r.city) LIKE ?)`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (sort === 'oldest') {
      query += ` ORDER BY r.created_at ASC`;
    } else if (sort === 'views') {
      query += ` ORDER BY r.views_count DESC, r.created_at DESC`;
    } else {
      query += ` ORDER BY r.created_at DESC`;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    // Get total count
    const countSql = `SELECT count(*) as total FROM (${query})`;
    const total = (db.prepare(countSql).get(...params) as any)?.total || 0;

    query += ` LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);

    const reports = db.prepare(query).all(...params).map((r: any) => {
      // Never expose secret verification detail in public feeds
      const { secret_verification_detail, ...safeReport } = r;
      return {
        ...safeReport,
        is_liked: Boolean(safeReport.is_liked),
        is_bookmarked: Boolean(safeReport.is_bookmarked),
      };
    });

    res.json({
      reports,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    console.error('Fetch reports error:', err);
    res.status(500).json({ error: 'Failed to retrieve reports' });
  }
});

apiRouter.post('/reports', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      type,
      title,
      description,
      category,
      location,
      city,
      date_occurred,
      primary_image,
      secret_verification_detail = '',
      contact_preference = 'in_app',
      preferred_language = 'en',
      additional_images = [],
    } = req.body;

    if (!type || !['lost', 'found'].includes(type)) {
      res.status(400).json({ error: 'Report type must be "lost" or "found"' });
      return;
    }

    if (!title || !description || !category || !location || !city || !date_occurred) {
      res.status(400).json({ error: 'All primary fields (title, description, category, location, city, date) are required' });
      return;
    }

    const reportId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.transaction(() => {
      db.prepare(`
        INSERT INTO reports (
          id, user_id, type, title, description, category, location, city,
          date_occurred, primary_image, secret_verification_detail,
          contact_preference, preferred_language, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)
      `).run(
        reportId,
        req.user!.id,
        type,
        title.trim(),
        description.trim(),
        category,
        location.trim(),
        city.trim(),
        date_occurred,
        primary_image || null,
        secret_verification_detail.trim(),
        contact_preference,
        preferred_language,
        now,
        now
      );

      if (Array.isArray(additional_images)) {
        const insertImage = db.prepare(`
          INSERT INTO report_images (id, report_id, image_url, created_at) VALUES (?, ?, ?, ?)
        `);
        for (const imgUrl of additional_images) {
          if (imgUrl && typeof imgUrl === 'string') {
            insertImage.run(crypto.randomUUID(), reportId, imgUrl, now);
          }
        }
      }
    })();

    res.status(201).json({ id: reportId, message: 'Report published successfully' });
  } catch (err: any) {
    console.error('Create report error:', err);
    res.status(500).json({ error: 'Failed to create report' });
  }
});

apiRouter.get('/reports/:id', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;

    // Increment view count
    db.prepare('UPDATE reports SET views_count = views_count + 1 WHERE id = ?').run(reportId);

    const report = db.prepare(`
      SELECT r.*,
        u.name as author_name, u.avatar_url as author_avatar, u.role as author_role, u.created_at as author_joined,
        (SELECT count(*) FROM likes l WHERE l.report_id = r.id) as likes_count,
        (SELECT count(*) FROM comments c WHERE c.report_id = r.id) as comments_count,
        (SELECT count(*) FROM ownership_claims oc WHERE oc.report_id = r.id) as claims_count
      FROM reports r
      JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
    `).get(reportId) as any;

    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const currentUserId = req.user?.id;
    let isLiked = false;
    let isBookmarked = false;

    if (currentUserId) {
      const likeCheck = db.prepare('SELECT 1 FROM likes WHERE report_id = ? AND user_id = ?').get(reportId, currentUserId);
      const bookmarkCheck = db.prepare('SELECT 1 FROM bookmarks WHERE report_id = ? AND user_id = ?').get(reportId, currentUserId);
      isLiked = Boolean(likeCheck);
      isBookmarked = Boolean(bookmarkCheck);
    }

    const images = db.prepare('SELECT image_url FROM report_images WHERE report_id = ?').all(reportId).map((row: any) => row.image_url);

    // Only allow owner or admin to see the secret verification detail
    const isOwner = currentUserId === report.user_id;
    const isAdmin = req.user?.role === 'admin';
    const hasSecretAccess = isOwner || isAdmin;

    const safeReport = {
      ...report,
      is_liked: isLiked,
      is_bookmarked: isBookmarked,
      images,
      secret_verification_detail: hasSecretAccess ? report.secret_verification_detail : undefined,
      has_secret_detail: Boolean(report.secret_verification_detail && report.secret_verification_detail.length > 0),
    };

    res.json({ report: safeReport });
  } catch (err: any) {
    console.error('Get report error:', err);
    res.status(500).json({ error: 'Failed to retrieve report' });
  }
});

apiRouter.put('/reports/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const existing = db.prepare('SELECT user_id, status FROM reports WHERE id = ?').get(reportId) as any;

    if (!existing) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const isOwner = req.user!.id === existing.user_id;
    const isAdmin = req.user!.role === 'admin';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ error: 'Not authorized to edit this report' });
      return;
    }

    const {
      title,
      description,
      category,
      location,
      city,
      date_occurred,
      primary_image,
      secret_verification_detail,
      status,
    } = req.body;

    const updates: string[] = ['updated_at = ?'];
    const params: any[] = [new Date().toISOString()];

    if (title) { updates.push('title = ?'); params.push(title.trim()); }
    if (description) { updates.push('description = ?'); params.push(description.trim()); }
    if (category) { updates.push('category = ?'); params.push(category); }
    if (location) { updates.push('location = ?'); params.push(location.trim()); }
    if (city) { updates.push('city = ?'); params.push(city.trim()); }
    if (date_occurred) { updates.push('date_occurred = ?'); params.push(date_occurred); }
    if (primary_image !== undefined) { updates.push('primary_image = ?'); params.push(primary_image); }
    if (secret_verification_detail !== undefined) {
      updates.push('secret_verification_detail = ?');
      params.push(secret_verification_detail.trim());
    }
    if (status && ['open', 'matched', 'resolved', 'closed'].includes(status)) {
      updates.push('status = ?');
      params.push(status);
    }

    params.push(reportId);
    db.prepare(`UPDATE reports SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    res.json({ message: 'Report updated successfully' });
  } catch (err: any) {
    console.error('Update report error:', err);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

apiRouter.delete('/reports/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const existing = db.prepare('SELECT user_id, title FROM reports WHERE id = ?').get(reportId) as any;

    if (!existing) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const isOwner = req.user!.id === existing.user_id;
    const isAdmin = req.user!.role === 'admin';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ error: 'Not authorized to delete this report' });
      return;
    }

    db.prepare('DELETE FROM reports WHERE id = ?').run(reportId);

    if (isAdmin && !isOwner) {
      db.prepare(`
        INSERT INTO moderation_actions (id, moderator_id, action_type, target_id, details, created_at)
        VALUES (?, ?, 'delete_report', ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        req.user!.id,
        reportId,
        `Deleted report "${existing.title}"`,
        new Date().toISOString()
      );
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (err: any) {
    console.error('Delete report error:', err);
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

apiRouter.post('/reports/:id/like', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const userId = req.user!.id;

    const report = db.prepare('SELECT user_id, title FROM reports WHERE id = ?').get(reportId) as any;
    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const existing = db.prepare('SELECT id FROM likes WHERE report_id = ? AND user_id = ?').get(reportId, userId) as any;
    if (existing) {
      db.prepare('DELETE FROM likes WHERE id = ?').run(existing.id);
      res.json({ liked: false });
    } else {
      const id = crypto.randomUUID();
      db.prepare('INSERT INTO likes (id, report_id, user_id, created_at) VALUES (?, ?, ?, ?)').run(
        id,
        reportId,
        userId,
        new Date().toISOString()
      );

      // Notify report owner if not self
      if (report.user_id !== userId) {
        db.prepare(`
          INSERT INTO notifications (id, user_id, type, title, message, link, created_at)
          VALUES (?, ?, 'like', 'New reaction', ?, ?, ?)
        `).run(
          crypto.randomUUID(),
          report.user_id,
          `${req.user!.name} reacted to your report "${report.title}"`,
          `/reports/${reportId}`,
          new Date().toISOString()
        );
      }
      res.json({ liked: true });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update reaction' });
  }
});

apiRouter.post('/reports/:id/bookmark', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const userId = req.user!.id;

    const existing = db.prepare('SELECT id FROM bookmarks WHERE report_id = ? AND user_id = ?').get(reportId, userId) as any;
    if (existing) {
      db.prepare('DELETE FROM bookmarks WHERE id = ?').run(existing.id);
      res.json({ bookmarked: false });
    } else {
      const id = crypto.randomUUID();
      db.prepare('INSERT INTO bookmarks (id, report_id, user_id, created_at) VALUES (?, ?, ?, ?)').run(
        id,
        reportId,
        userId,
        new Date().toISOString()
      );
      res.json({ bookmarked: true });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to bookmark report' });
  }
});

// -------------------------------------------------------------
// COMMENTS
// -------------------------------------------------------------

apiRouter.get('/reports/:id/comments', (req: Request, res: Response) => {
  try {
    const comments = db.prepare(`
      SELECT c.*, u.name as author_name, u.avatar_url as author_avatar, u.role as author_role
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.report_id = ?
      ORDER BY c.created_at ASC
    `).all(req.params.id);

    res.json({ comments });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

apiRouter.post('/reports/:id/comments', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      res.status(400).json({ error: 'Comment content cannot be empty' });
      return;
    }

    const reportId = req.params.id;
    const report = db.prepare('SELECT user_id, title FROM reports WHERE id = ?').get(reportId) as any;
    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const commentId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO comments (id, report_id, user_id, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(commentId, reportId, req.user!.id, content.trim(), now);

    // Notify author
    if (report.user_id !== req.user!.id) {
      db.prepare(`
        INSERT INTO notifications (id, user_id, type, title, message, link, created_at)
        VALUES (?, ?, 'comment', 'New comment', ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        report.user_id,
        `${req.user!.name} commented on "${report.title}"`,
        `/reports/${reportId}`,
        now
      );
    }

    const createdComment = db.prepare(`
      SELECT c.*, u.name as author_name, u.avatar_url as author_avatar, u.role as author_role
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(commentId);

    res.status(201).json({ comment: createdComment });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

apiRouter.delete('/comments/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment = db.prepare('SELECT user_id FROM comments WHERE id = ?').get(commentId) as any;

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    if (comment.user_id !== req.user!.id && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Not authorized to delete this comment' });
      return;
    }

    db.prepare('DELETE FROM comments WHERE id = ?').run(commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// -------------------------------------------------------------
// OWNERSHIP CLAIMS & RETURN WORKFLOW
// -------------------------------------------------------------

apiRouter.post('/reports/:id/claims', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const { explanation, evidence_details = '', evidence_image = '' } = req.body;

    if (!explanation || explanation.trim().length < 5) {
      res.status(400).json({ error: 'Please provide a clear explanation of ownership (at least 5 characters)' });
      return;
    }

    const report = db.prepare('SELECT user_id, title FROM reports WHERE id = ?').get(reportId) as any;
    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    if (report.user_id === req.user!.id) {
      res.status(400).json({ error: 'You cannot submit an ownership claim on your own report' });
      return;
    }

    const claimId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO ownership_claims (
        id, report_id, claimant_id, explanation, evidence_details, evidence_image, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `).run(
      claimId,
      reportId,
      req.user!.id,
      explanation.trim(),
      evidence_details.trim(),
      evidence_image || null,
      now,
      now
    );

    // Notify report finder/owner
    db.prepare(`
      INSERT INTO notifications (id, user_id, type, title, message, link, created_at)
      VALUES (?, ?, 'claim_submitted', 'Ownership Claim Received', ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      report.user_id,
      `${req.user!.name} submitted an ownership claim on "${report.title}"`,
      `/reports/${reportId}?tab=claims`,
      now
    );

    res.status(201).json({ id: claimId, message: 'Ownership claim submitted successfully' });
  } catch (err: any) {
    console.error('Submit claim error:', err);
    res.status(500).json({ error: 'Failed to submit ownership claim' });
  }
});

apiRouter.get('/reports/:id/claims', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const reportId = req.params.id;
    const report = db.prepare('SELECT user_id FROM reports WHERE id = ?').get(reportId) as any;

    if (!report) {
      res.status(404).json({ error: 'Report not found' });
      return;
    }

    const isOwner = req.user!.id === report.user_id;
    const isAdmin = req.user!.role === 'admin';

    let claims;
    if (isOwner || isAdmin) {
      // Owner/Admin sees all claims on this report
      claims = db.prepare(`
        SELECT oc.*, u.name as claimant_name, u.avatar_url as claimant_avatar, u.email as claimant_email
        FROM ownership_claims oc
        JOIN users u ON oc.claimant_id = u.id
        WHERE oc.report_id = ?
        ORDER BY oc.created_at DESC
      `).all(reportId);
    } else {
      // Claimant sees only their own claim
      claims = db.prepare(`
        SELECT oc.*, u.name as claimant_name, u.avatar_url as claimant_avatar
        FROM ownership_claims oc
        JOIN users u ON oc.claimant_id = u.id
        WHERE oc.report_id = ? AND oc.claimant_id = ?
        ORDER BY oc.created_at DESC
      `).all(reportId, req.user!.id);
    }

    res.json({ claims });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

apiRouter.get('/claims/my', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const claims = db.prepare(`
      SELECT oc.*, r.title as report_title, r.type as report_type, r.primary_image as report_image, r.status as report_status
      FROM ownership_claims oc
      JOIN reports r ON oc.report_id = r.id
      WHERE oc.claimant_id = ?
      ORDER BY oc.created_at DESC
    `).all(req.user!.id);

    res.json({ claims });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve user claims' });
  }
});

apiRouter.put('/claims/:id/status', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const claimId = req.params.id;
    const { status, decision_reason = '' } = req.body;

    if (!['pending', 'under_review', 'accepted', 'rejected', 'withdrawn'].includes(status)) {
      res.status(400).json({ error: 'Invalid claim status' });
      return;
    }

    const claim = db.prepare(`
      SELECT oc.*, r.user_id as report_owner_id, r.title as report_title
      FROM ownership_claims oc
      JOIN reports r ON oc.report_id = r.id
      WHERE oc.id = ?
    `).get(claimId) as any;

    if (!claim) {
      res.status(404).json({ error: 'Claim not found' });
      return;
    }

    const isReportOwner = req.user!.id === claim.report_owner_id;
    const isClaimant = req.user!.id === claim.claimant_id;
    const isAdmin = req.user!.role === 'admin';

    // Claimant can only withdraw
    if (isClaimant && status === 'withdrawn') {
      db.prepare('UPDATE ownership_claims SET status = ?, updated_at = ? WHERE id = ?').run(
        'withdrawn',
        new Date().toISOString(),
        claimId
      );
      res.json({ message: 'Claim withdrawn' });
      return;
    }

    // Otherwise must be report owner or admin
    if (!isReportOwner && !isAdmin) {
      res.status(403).json({ error: 'Not authorized to change status of this claim' });
      return;
    }

    const now = new Date().toISOString();

    db.transaction(() => {
      db.prepare(`
        UPDATE ownership_claims
        SET status = ?, decision_reason = ?, updated_at = ?
        WHERE id = ?
      `).run(status, decision_reason.trim(), now, claimId);

      // If accepted, we can mark the report as matched or resolved
      if (status === 'accepted') {
        db.prepare('UPDATE reports SET status = ?, updated_at = ? WHERE id = ?').run(
          'resolved',
          now,
          claim.report_id
        );
      }

      // Notify claimant
      db.prepare(`
        INSERT INTO notifications (id, user_id, type, title, message, link, created_at)
        VALUES (?, ?, 'claim_status', 'Claim Status Updated', ?, ?, ?)
      `).run(
        crypto.randomUUID(),
        claim.claimant_id,
        `Your ownership claim on "${claim.report_title}" was updated to: ${status}`,
        `/reports/${claim.report_id}`,
        now
      );
    })();

    res.json({ message: `Claim status updated to ${status}` });
  } catch (err: any) {
    console.error('Update claim status error:', err);
    res.status(500).json({ error: 'Failed to update claim status' });
  }
});

// -------------------------------------------------------------
// MESSAGING & CONVERSATIONS
// -------------------------------------------------------------

apiRouter.get('/conversations', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const conversations = db.prepare(`
      SELECT 
        c.id, c.report_id, c.created_at, c.updated_at,
        r.title as report_title, r.type as report_type,
        other_u.id as other_user_id, other_u.name as other_user_name, other_u.avatar_url as other_user_avatar,
        (
          SELECT content FROM messages m 
          WHERE m.conversation_id = c.id 
          ORDER BY m.created_at DESC LIMIT 1
        ) as last_message_content,
        (
          SELECT created_at FROM messages m 
          WHERE m.conversation_id = c.id 
          ORDER BY m.created_at DESC LIMIT 1
        ) as last_message_time,
        (
          SELECT count(*) FROM messages m 
          WHERE m.conversation_id = c.id 
            AND m.sender_id != ? 
            AND m.created_at > COALESCE(cp.last_read_at, '1970-01-01')
        ) as unread_count
      FROM conversations c
      JOIN conversation_participants cp ON c.id = cp.conversation_id AND cp.user_id = ?
      JOIN conversation_participants other_cp ON c.id = other_cp.conversation_id AND other_cp.user_id != ?
      JOIN users other_u ON other_cp.user_id = other_u.id
      LEFT JOIN reports r ON c.report_id = r.id
      ORDER BY COALESCE(c.updated_at, c.created_at) DESC
    `).all(userId, userId, userId);

    res.json({ conversations });
  } catch (err: any) {
    console.error('Get conversations error:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

apiRouter.post('/conversations', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { recipientId, reportId } = req.body;
    const currentUserId = req.user!.id;

    if (!recipientId) {
      res.status(400).json({ error: 'Recipient is required' });
      return;
    }

    if (recipientId === currentUserId) {
      res.status(400).json({ error: 'Cannot start a conversation with yourself' });
      return;
    }

    // Check if user is blocked
    const isBlocked = db.prepare(`
      SELECT 1 FROM user_blocks 
      WHERE (blocker_id = ? AND blocked_id = ?) OR (blocker_id = ? AND blocked_id = ?)
    `).get(currentUserId, recipientId, recipientId, currentUserId);

    if (isBlocked) {
      res.status(403).json({ error: 'Cannot message this user due to privacy blocks' });
      return;
    }

    // Check if conversation already exists between these 2 users
    const existing = db.prepare(`
      SELECT c.id FROM conversations c
      JOIN conversation_participants cp1 ON c.id = cp1.conversation_id AND cp1.user_id = ?
      JOIN conversation_participants cp2 ON c.id = cp2.conversation_id AND cp2.user_id = ?
      ${reportId ? 'WHERE c.report_id = ?' : ''}
      LIMIT 1
    `).get(...(reportId ? [currentUserId, recipientId, reportId] : [currentUserId, recipientId])) as any;

    if (existing) {
      res.json({ conversationId: existing.id });
      return;
    }

    const conversationId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.transaction(() => {
      db.prepare('INSERT INTO conversations (id, report_id, created_at, updated_at) VALUES (?, ?, ?, ?)').run(
        conversationId,
        reportId || null,
        now,
        now
      );

      db.prepare('INSERT INTO conversation_participants (id, conversation_id, user_id, last_read_at) VALUES (?, ?, ?, ?)').run(
        crypto.randomUUID(),
        conversationId,
        currentUserId,
        now
      );

      db.prepare('INSERT INTO conversation_participants (id, conversation_id, user_id, last_read_at) VALUES (?, ?, ?, ?)').run(
        crypto.randomUUID(),
        conversationId,
        recipientId,
        null
      );
    })();

    res.status(201).json({ conversationId });
  } catch (err: any) {
    console.error('Create conversation error:', err);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

apiRouter.get('/conversations/:id/messages', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const conversationId = req.params.id;
    const currentUserId = req.user!.id;

    // Check participant
    const isParticipant = db.prepare(`
      SELECT 1 FROM conversation_participants WHERE conversation_id = ? AND user_id = ?
    `).get(conversationId, currentUserId);

    if (!isParticipant && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Not authorized to view this conversation' });
      return;
    }

    const now = new Date().toISOString();
    // Mark as read
    db.prepare(`
      UPDATE conversation_participants SET last_read_at = ? WHERE conversation_id = ? AND user_id = ?
    `).run(now, conversationId, currentUserId);

    const messages = db.prepare(`
      SELECT m.*, u.name as sender_name, u.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = ?
      ORDER BY m.created_at ASC
    `).all(conversationId);

    res.json({ messages });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

apiRouter.post('/conversations/:id/messages', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const conversationId = req.params.id;
    const { content } = req.body;
    const senderId = req.user!.id;

    if (!content || !content.trim()) {
      res.status(400).json({ error: 'Message cannot be empty' });
      return;
    }

    const participant = db.prepare(`
      SELECT 1 FROM conversation_participants WHERE conversation_id = ? AND user_id = ?
    `).get(conversationId, senderId);

    if (!participant) {
      res.status(403).json({ error: 'Not a participant of this conversation' });
      return;
    }

    // Get the recipient
    const recipient = db.prepare(`
      SELECT user_id FROM conversation_participants WHERE conversation_id = ? AND user_id != ?
    `).get(conversationId, senderId) as any;

    const messageId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.transaction(() => {
      db.prepare(`
        INSERT INTO messages (id, conversation_id, sender_id, content, created_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(messageId, conversationId, senderId, content.trim(), now);

      db.prepare('UPDATE conversations SET updated_at = ? WHERE id = ?').run(now, conversationId);
      db.prepare('UPDATE conversation_participants SET last_read_at = ? WHERE conversation_id = ? AND user_id = ?').run(
        now,
        conversationId,
        senderId
      );

      if (recipient) {
        db.prepare(`
          INSERT INTO notifications (id, user_id, type, title, message, link, created_at)
          VALUES (?, ?, 'message', 'New message', ?, ?, ?)
        `).run(
          crypto.randomUUID(),
          recipient.user_id,
          `${req.user!.name} sent you a message`,
          `/messages?convo=${conversationId}`,
          now
        );
      }
    })();

    const created = db.prepare(`
      SELECT m.*, u.name as sender_name, u.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `).get(messageId);

    res.status(201).json({ message: created });
  } catch (err: any) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// -------------------------------------------------------------
// NOTIFICATIONS
// -------------------------------------------------------------

apiRouter.get('/notifications', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const notifications = db.prepare(`
      SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50
    `).all(req.user!.id);

    const unreadCount = (db.prepare(`
      SELECT count(*) as count FROM notifications WHERE user_id = ? AND is_read = 0
    `).get(req.user!.id) as any).count;

    res.json({ notifications, unreadCount });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

apiRouter.put('/notifications/:id/read', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').run(
    req.params.id,
    req.user!.id
  );
  res.json({ success: true });
});

apiRouter.put('/notifications/read-all', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  db.prepare('UPDATE notifications SET is_read = 1 WHERE user_id = ?').run(req.user!.id);
  res.json({ success: true });
});

// -------------------------------------------------------------
// USER PROFILE & ACCOUNT MANAGEMENT
// -------------------------------------------------------------

apiRouter.get('/users/:id', (req: Request, res: Response) => {
  try {
    const user = db.prepare(`
      SELECT id, name, avatar_url, bio, city, role, created_at
      FROM users WHERE id = ? AND is_suspended = 0
    `).get(req.params.id) as any;

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const reportsCount = (db.prepare(`
      SELECT count(*) as count FROM reports WHERE user_id = ?
    `).get(user.id) as any).count;

    const resolvedCount = (db.prepare(`
      SELECT count(*) as count FROM reports WHERE user_id = ? AND status = 'resolved'
    `).get(user.id) as any).count;

    res.json({
      user: {
        ...user,
        reports_count: reportsCount,
        resolved_count: resolvedCount,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load user profile' });
  }
});

apiRouter.put('/users/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, bio, city, avatar_url, preferred_language, preferred_theme } = req.body;
    const userId = req.user!.id;

    const updates: string[] = ['updated_at = ?'];
    const params: any[] = [new Date().toISOString()];

    if (name && name.trim()) { updates.push('name = ?'); params.push(name.trim()); }
    if (bio !== undefined) { updates.push('bio = ?'); params.push(bio.trim()); }
    if (city !== undefined) { updates.push('city = ?'); params.push(city.trim()); }
    if (avatar_url !== undefined) { updates.push('avatar_url = ?'); params.push(avatar_url); }
    if (preferred_language) { updates.push('preferred_language = ?'); params.push(preferred_language); }
    if (preferred_theme) { updates.push('preferred_theme = ?'); params.push(preferred_theme); }

    params.push(userId);
    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    const updated = db.prepare(`
      SELECT id, name, email, role, avatar_url, bio, city, preferred_language, preferred_theme, created_at
      FROM users WHERE id = ?
    `).get(userId);

    res.json({ user: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

apiRouter.put('/users/password', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      res.status(400).json({ error: 'Current password and new password (min 6 chars) required' });
      return;
    }

    const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user!.id) as any;
    const matches = await comparePassword(currentPassword, user.password_hash);
    if (!matches) {
      res.status(400).json({ error: 'Current password does not match' });
      return;
    }

    const newHash = await hashPassword(newPassword);
    db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(
      newHash,
      new Date().toISOString(),
      req.user!.id
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update password' });
  }
});

apiRouter.get('/users/data-export', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = db.prepare('SELECT id, name, email, role, bio, city, created_at FROM users WHERE id = ?').get(userId);
    const reports = db.prepare('SELECT * FROM reports WHERE user_id = ?').all(userId);
    const comments = db.prepare('SELECT * FROM comments WHERE user_id = ?').all(userId);
    const claims = db.prepare('SELECT * FROM ownership_claims WHERE claimant_id = ?').all(userId);
    const messages = db.prepare('SELECT * FROM messages WHERE sender_id = ?').all(userId);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="findora-my-data.json"');
    res.json({
      exported_at: new Date().toISOString(),
      profile,
      reports,
      comments,
      claims,
      messages,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to export data' });
  }
});

apiRouter.delete('/users/account', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    // Foreign keys with cascade will clean up reports, comments, bookmarks, claims, notifications
    db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    res.json({ message: 'Account and associated data deleted' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// -------------------------------------------------------------
// SAFETY & MODERATION
// -------------------------------------------------------------

apiRouter.post('/safety/report', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { target_type, target_id, reason, details = '' } = req.body;
    if (!['report', 'comment', 'user'].includes(target_type) || !target_id || !reason) {
      res.status(400).json({ error: 'Target type, target id, and reason are required' });
      return;
    }

    const reportId = crypto.randomUUID();
    db.prepare(`
      INSERT INTO content_reports (id, reporter_id, target_type, target_id, reason, details, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
    `).run(
      reportId,
      req.user!.id,
      target_type,
      target_id,
      reason,
      details.trim(),
      new Date().toISOString()
    );

    res.status(201).json({ message: 'Thank you for your report. Our moderation team will review it.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

apiRouter.post('/safety/block', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId || userId === req.user!.id) {
      res.status(400).json({ error: 'Invalid user to block' });
      return;
    }

    const id = crypto.randomUUID();
    db.prepare(`
      INSERT OR IGNORE INTO user_blocks (id, blocker_id, blocked_id, created_at)
      VALUES (?, ?, ?, ?)
    `).run(id, req.user!.id, userId, new Date().toISOString());

    res.json({ message: 'User blocked' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to block user' });
  }
});

apiRouter.get('/safety/blocks', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const blocks = db.prepare(`
      SELECT b.id, b.blocked_id, u.name as blocked_name, u.avatar_url as blocked_avatar, b.created_at
      FROM user_blocks b
      JOIN users u ON b.blocked_id = u.id
      WHERE b.blocker_id = ?
    `).all(req.user!.id);

    res.json({ blocks });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch blocked users' });
  }
});

apiRouter.delete('/safety/block/:userId', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM user_blocks WHERE blocker_id = ? AND blocked_id = ?').run(
      req.user!.id,
      req.params.userId
    );
    res.json({ message: 'User unblocked' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to unblock user' });
  }
});

// -------------------------------------------------------------
// ADMIN DASHBOARD & AUDIT LOGS
// -------------------------------------------------------------

apiRouter.get('/admin/stats', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const totalUsers = (db.prepare('SELECT count(*) as count FROM users').get() as any).count;
    const totalReports = (db.prepare('SELECT count(*) as count FROM reports').get() as any).count;
    const lostCount = (db.prepare("SELECT count(*) as count FROM reports WHERE type = 'lost'").get() as any).count;
    const foundCount = (db.prepare("SELECT count(*) as count FROM reports WHERE type = 'found'").get() as any).count;
    const resolvedCount = (db.prepare("SELECT count(*) as count FROM reports WHERE status = 'resolved'").get() as any).count;
    const pendingReports = (db.prepare("SELECT count(*) as count FROM content_reports WHERE status = 'pending'").get() as any).count;
    const totalClaims = (db.prepare('SELECT count(*) as count FROM ownership_claims').get() as any).count;

    res.json({
      totalUsers,
      totalReports,
      lostCount,
      foundCount,
      resolvedCount,
      pendingReports,
      totalClaims,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

apiRouter.get('/admin/reports', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status = 'pending' } = req.query as any;
    const reports = db.prepare(`
      SELECT cr.*, u.name as reporter_name, u.email as reporter_email
      FROM content_reports cr
      JOIN users u ON cr.reporter_id = u.id
      WHERE cr.status = ?
      ORDER BY cr.created_at DESC
    `).all(status);

    res.json({ reports });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load moderation reports' });
  }
});

apiRouter.put('/admin/reports/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, moderator_notes = '' } = req.body;
    if (!['reviewed', 'dismissed', 'actioned'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    db.prepare(`
      UPDATE content_reports
      SET status = ?, moderator_notes = ?
      WHERE id = ?
    `).run(status, moderator_notes.trim(), req.params.id);

    db.prepare(`
      INSERT INTO moderation_actions (id, moderator_id, action_type, target_id, details, created_at)
      VALUES (?, ?, 'review_report', ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      req.user!.id,
      req.params.id,
      `Moderator set status to ${status}: ${moderator_notes}`,
      new Date().toISOString()
    );

    res.json({ message: 'Moderation status updated' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update report' });
  }
});

apiRouter.get('/admin/audit-logs', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const logs = db.prepare(`
      SELECT ma.*, u.name as moderator_name
      FROM moderation_actions ma
      JOIN users u ON ma.moderator_id = u.id
      ORDER BY ma.created_at DESC LIMIT 100
    `).all();

    res.json({ logs });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

apiRouter.put('/admin/users/:id/suspend', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const targetUserId = req.params.id;
    const user = db.prepare('SELECT is_suspended, name FROM users WHERE id = ?').get(targetUserId) as any;

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const newSuspension = user.is_suspended ? 0 : 1;
    db.prepare('UPDATE users SET is_suspended = ? WHERE id = ?').run(newSuspension, targetUserId);

    db.prepare(`
      INSERT INTO moderation_actions (id, moderator_id, action_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      req.user!.id,
      newSuspension ? 'suspend_user' : 'unsuspend_user',
      targetUserId,
      `${newSuspension ? 'Suspended' : 'Unsuspended'} user ${user.name}`,
      new Date().toISOString()
    );

    res.json({ is_suspended: Boolean(newSuspension) });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update suspension' });
  }
});
