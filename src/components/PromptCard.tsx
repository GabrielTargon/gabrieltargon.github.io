import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Prompt, getTagColor } from '../config/prompts';

type GenderVariant = 'Feminine' | 'Masculine';

interface PromptCardProps {
  prompt: Prompt;
  mode: 'detail' | 'list';
}

export function PromptCard({ prompt, mode }: PromptCardProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showPhotoReminder, setShowPhotoReminder] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [genderVariant, setGenderVariant] = useState<GenderVariant | null>(null);
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});

  const hasVariants = prompt.variants === 'gender';

  const promptText =
    hasVariants && genderVariant
      ? t(`prompts.${prompt.id}.text${genderVariant}`)
      : hasVariants
      ? ''
      : t(`prompts.${prompt.id}.text`);

  const placeholders = [...new Set([...promptText.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]))];

  useEffect(() => {
    setPlaceholderValues({});
  }, [promptText]);

  const filledPromptText = placeholders.reduce((text, key) => {
    const value = placeholderValues[key]?.trim();
    return value ? text.replace(new RegExp(`\\[${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'g'), value) : text;
  }, promptText);

  const allPlaceholdersFilled = placeholders.length === 0 || placeholders.every(p => placeholderValues[p]?.trim());
  const canCopy = (!hasVariants || genderVariant !== null) && allPlaceholdersFilled;

  const handleCopyPrompt = () => {
    if (!canCopy) return;
    navigator.clipboard.writeText(filledPromptText);
    setCopied(true);
    if (prompt.requiresPhoto) setShowPhotoReminder(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const url =
      mode === 'detail'
        ? window.location.href
        : `${window.location.origin}/prompts/${prompt.id}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const title = t(`prompts.${prompt.id}.title`);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
      <div className="w-full bg-slate-100 flex items-center justify-center">
        <img
          src={prompt.image}
          alt={title}
          className="w-full object-contain"
        />
      </div>

      <div className="p-6">
        {/* Tags + share link */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tagId) => (
              <span
                key={tagId}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagColor(tagId)}`}
              >
                {t(`tags.${tagId}`)}
              </span>
            ))}
          </div>
          <button
            onClick={handleCopyLink}
            title={t('common.shareLink')}
            className={`p-1.5 rounded-lg border transition-colors flex-shrink-0 ${
              linkCopied
                ? 'text-green-600 border-green-300 bg-green-50'
                : 'text-slate-400 border-slate-200 bg-slate-50 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            {linkCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>
        </div>

        {/* Title */}
        {mode === 'detail' ? (
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
        ) : (
          <Link to={`/prompts/${prompt.id}`}>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 underline cursor-pointer">{title}</h2>
          </Link>
        )}

        {t(`prompts.${prompt.id}.description`) && (
          <p className="text-slate-600 text-sm mb-6">
            {t(`prompts.${prompt.id}.description`)}
          </p>
        )}

        {/* Gender selector */}
        {hasVariants && (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              {t('prompts.selectGender')}
            </p>
            <div className="flex gap-3">
              {(['Masculine', 'Feminine'] as GenderVariant[]).map((variant) => (
                <button
                  key={variant}
                  onClick={() => setGenderVariant(variant)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                    genderVariant === variant
                      ? 'border-slate-800 bg-slate-800 text-white shadow'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {t(`common.${variant.toLowerCase()}`)}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* Placeholder inputs */}
        {placeholders.length > 0 && (
          <div className="mb-5 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('prompts.fillDetails')}
            </p>
            {placeholders.map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                </label>
                <input
                  type="text"
                  value={placeholderValues[key] ?? ''}
                  onChange={(e) =>
                    setPlaceholderValues((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={`${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}...`}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
                />
              </div>
            ))}
          </div>
        )}

        {/* Prompt textarea */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
            {t('prompts.promptLabel')}
          </label>
          <textarea
            readOnly
            value={filledPromptText}
            placeholder={hasVariants && !genderVariant ? t('prompts.selectGenderPlaceholder') : undefined}
            className={`w-full px-4 py-3 border rounded-lg bg-slate-50 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors ${
              hasVariants && !genderVariant
                ? 'border-slate-200 text-slate-400 italic'
                : 'border-slate-300 text-slate-700'
            }`}
            rows={mode === 'detail' ? 6 : 4}
          />
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopyPrompt}
          disabled={!canCopy}
          title={
            !canCopy
              ? hasVariants && !genderVariant
                ? t('prompts.genderRequired')
                : t('prompts.fillRequired')
              : undefined
          }
          className={`w-full px-4 py-2 font-medium text-sm transition-all duration-200 rounded-lg ${
            !canCopy
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : copied
              ? 'bg-green-500 text-white'
              : 'bg-slate-700 text-white hover:bg-slate-800'
          }`}
        >
          {copied ? t('common.copied') : t('common.copy')}
        </button>
        {showPhotoReminder && (
          <p className="mt-2 text-xs text-center text-sky-500 font-medium">
            {t('prompts.uploadPhotoNotice')}
          </p>
        )}
      </div>
    </div>
  );
}
