import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { prompts, getTagColor } from '../config/prompts';
import { PageHeader } from './PageHeader';

type GenderVariant = 'Feminine' | 'Masculine';

export function PromptDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [genderVariant, setGenderVariant] = useState<GenderVariant>('Masculine');

  const prompt = prompts.find((p) => p.id === id);
  if (!prompt) return <Navigate to="/prompts" replace />;

  const hasVariants = prompt.variants === 'gender';
  const otherPrompts = prompts.filter((p) => p.id !== prompt.id);

  const promptText = hasVariants
    ? t(`prompts.${prompt.id}.text${genderVariant}`)
    : t(`prompts.${prompt.id}.text`);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Profile header */}
      <PageHeader />

      {/* Header */}
      <div className="max-w-2xl mx-auto w-full px-4 py-3">
        <Link
          to="/prompts"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
        >
          <span>←</span>
          <span>{t('common.back')}</span>
        </Link>
      </div>

      {/* Prompt card */}
      <div className="max-w-2xl mx-auto w-full px-4 flex-1">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
          <div className="w-full bg-slate-100 flex items-center justify-center">
            <img
              src={prompt.image}
              alt={t(`prompts.${prompt.id}.title`)}
              className="w-full object-contain"
            />
          </div>

          <div className="p-6">
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

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {t(`prompts.${prompt.id}.title`)}
            </h1>

            {t(`prompts.${prompt.id}.description`) && (
              <p className="text-slate-600 text-sm mb-6">
                {t(`prompts.${prompt.id}.description`)}
              </p>
            )}

            {prompt.requiresPhoto && (
              <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                {t('prompts.uploadPhotoNotice')}
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-600">
                  {t('prompts.promptLabel')}
                </label>
                {hasVariants && (
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                    {(['Masculine', 'Feminine'] as GenderVariant[]).map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setGenderVariant(variant)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                          genderVariant === variant
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {t(`common.${variant.toLowerCase()}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <textarea
                readOnly
                value={promptText}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
                rows={6}
              />
            </div>

            <button
              onClick={handleCopyPrompt}
              className={`w-full px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-200 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-800'
              }`}
            >
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
        </div>
      </div>

      {/* Vitrine — other prompts */}
      {otherPrompts.length > 0 && (
        <div className="max-w-2xl mx-auto w-full px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            {t('common.morePrompts')}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {otherPrompts.map((other) => (
              <Link
                key={other.id}
                to={`/prompts/${other.id}`}
                className="flex-shrink-0 w-32 group"
              >
                <div className="rounded-lg overflow-hidden border border-slate-200 group-hover:border-slate-400 transition-colors bg-white shadow-sm">
                  <img
                    src={other.image}
                    alt={t(`prompts.${other.id}.title`)}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <p className="mt-1.5 text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors line-clamp-2 leading-tight">
                  {t(`prompts.${other.id}.title`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="pb-8" />
    </div>
  );
}
