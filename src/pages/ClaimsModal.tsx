import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import { X, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';

interface ClaimsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle: string;
  onClaimSubmitted: () => void;
}

export const ClaimsModal: React.FC<ClaimsModalProps> = ({
  isOpen,
  onClose,
  reportId,
  reportTitle,
  onClaimSubmitted,
}) => {
  const { t } = useLanguage();
  const { token } = useAuth();

  const [explanation, setExplanation] = useState('');
  const [evidenceDetails, setEvidenceDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!explanation.trim() || explanation.trim().length < 5) {
        throw new Error('Please describe distinguishing features in at least 5 characters.');
      }

      const res = await fetch(`/api/reports/${reportId}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          explanation: explanation.trim(),
          evidence_details: evidenceDetails.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit claim');

      setSuccess(true);
      setTimeout(() => {
        onClaimSubmitted();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error submitting claim');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors focus:outline-none"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.claims.modalTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
            {reportTitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-2.5 text-xs text-emerald-700 dark:text-emerald-300">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Claim submitted! The finder will review your private details.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.claims.explanationLabel} *
            </label>
            <textarea
              required
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder={t.claims.explanationPlaceholder}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.claims.evidenceLabel}
            </label>
            <textarea
              rows={2}
              value={evidenceDetails}
              onChange={(e) => setEvidenceDetails(e.target.value)}
              placeholder={t.claims.evidencePlaceholder}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <ShieldAlert className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Your explanation and evidence are transmitted privately only to the report finder and verified administrators.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition-colors"
            >
              {isSubmitting ? t.common.loading : t.claims.submitClaim}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
