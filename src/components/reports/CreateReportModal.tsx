import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import { useAuth } from '../../context/AuthContext.js';
import {
  X,
  Upload,
  Shield,
  AlertTriangle,
  Package,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (reportId: string) => void;
  initialType?: 'lost' | 'found';
}

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onCreated,
  initialType = 'lost',
}) => {
  const { t, lang } = useLanguage();
  const { token } = useAuth();

  const [type, setType] = useState<'lost' | 'found'>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('phones_electronics');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [dateOccurred, setDateOccurred] = useState(() => new Date().toISOString().split('T')[0]);
  const [secretDetail, setSecretDetail] = useState('');
  const [contactPreference, setContactPreference] = useState('in_app');
  const [primaryImage, setPrimaryImage] = useState<string>('');

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file must be under 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');
      setPrimaryImage(data.url);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!title.trim() || !description.trim() || !city.trim() || !location.trim()) {
        throw new Error('Please fill in all required fields (title, description, city, location).');
      }

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          title: title.trim(),
          category,
          description: description.trim(),
          city: city.trim(),
          location: location.trim(),
          date_occurred: dateOccurred,
          primary_image: primaryImage || null,
          secret_verification_detail: secretDetail.trim(),
          contact_preference: contactPreference,
          preferred_language: lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish report');

      onCreated(data.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error publishing report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors focus:outline-none"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {type === 'lost' ? t.reportForm.titleLost : t.reportForm.titleFound}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t.reportForm.safetyNotice}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Selector (Segmented buttons) */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.reportForm.typePrompt}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 focus:outline-none ${
                  type === 'lost'
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-700 dark:text-rose-300 shadow-xs ring-1 ring-rose-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{t.reportForm.itemLost}</span>
              </button>

              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 focus:outline-none ${
                  type === 'found'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{t.reportForm.itemFound}</span>
              </button>
            </div>
          </div>

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t.reportForm.itemTitle} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.reportForm.itemTitlePlaceholder}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t.reportForm.category} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
              >
                {Object.entries(t.categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.reportForm.description} *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.reportForm.descriptionPlaceholder}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Location & City & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t.reportForm.city} *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.reportForm.cityPlaceholder}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t.reportForm.location} *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.reportForm.locationPlaceholder}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t.reportForm.date} *
              </label>
              <input
                type="date"
                required
                value={dateOccurred}
                onChange={(e) => setDateOccurred(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Photo Upload Slot */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.reportForm.uploadPhoto}
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/50">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {isUploading ? t.common.loading : 'Select image file'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {t.reportForm.uploadPhotoHint}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

              {primaryImage && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                  <img
                    src={primaryImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPrimaryImage('')}
                    className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Secret Verification Detail Box (Zero-Pill, clean styling) */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-1">
              <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{t.reportForm.secretDetail}</span>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400/90 leading-relaxed mb-2.5">
              {t.reportForm.secretDetailHint}
            </p>
            <input
              type="text"
              value={secretDetail}
              onChange={(e) => setSecretDetail(e.target.value)}
              placeholder="e.g. Phone has a cracked top-right glass edge and family lock screen photo"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 rounded-lg text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500"
            />
            <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-1.5">
              {t.reportForm.secretDetailWarning}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition-colors"
            >
              {isSubmitting ? t.common.loading : t.reportForm.submitReport}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
