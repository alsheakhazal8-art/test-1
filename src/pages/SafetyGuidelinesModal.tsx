import React from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { X, ShieldCheck, MapPin, EyeOff, AlertTriangle } from 'lucide-react';

interface SafetyGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyGuidelinesModal: React.FC<SafetyGuidelinesModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors focus:outline-none"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.safety.communityGuidelinesTitle}
          </h2>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>1. Always Meet in Well-Lit Public Locations</span>
            </h3>
            <p>
              When returning or claiming an item, agree to meet in populated public places such as police stations, university campuses, shopping center customer service desks, or transit hubs. Never invite strangers to private residences.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-amber-500" />
              <span>2. Protect Sensitive Identifying Information</span>
            </h3>
            <p>
              Never post photos showing full identification numbers, credit cards, bank account details, or unredacted passports. Use Findora's <em>Private Verification Detail</em> feature to ask claimants for proof without revealing answers publicly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>3. Never Send Money or Prepaid Codes</span>
            </h3>
            <p>
              Findora is a non-profit community platform. Genuine finders do not demand wire transfers, gift cards, courier payment fees, or crypto advances before returning found property. Report any user asking for prepaid funds immediately.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
