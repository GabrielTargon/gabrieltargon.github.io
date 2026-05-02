import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { prompts, getTagColor } from '../config/prompts';
import { PageHeader } from './PageHeader';

const allTagIds = Array.from(new Set(prompts.flatMap((p) => p.tags)));

type GenderVariant = 'Feminine' | 'Masculine';

export function Prompts() {
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [linkCopiedId, setLinkCopiedId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [genderVariants, setGenderVariants] = useState<Record<string, GenderVariant>>({});

  const getGenderVariant = (promptId: string): GenderVariant =>
    genderVariants[promptId] ?? 'Masculine';

  const getPromptText = (promptId: string, hasVariants: boolean, variant: GenderVariant) =>
    hasVariants
      ? t(`prompts.${promptId}.text${variant}`)
      : t(`prompts.${promptId}.text`);

  const handleCopyPrompt = (promptId: string, hasVariants: boolean) => {
    const variant = getGenderVariant(promptId);
    navigator.clipboard.writeText(getPromptText(promptId, hasVariants, variant));
    setCopiedId(promptId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyLink = (promptId: string) => {
    const url = `${window.location.origin}/prompts/${promptId}`;
    navigator.clipboard.writeText(url);
    setLinkCopiedId(promptId);
    setTimeout(() => setLinkCopiedId(null), 2000);
  };

  const filteredPrompts = selectedTag
    ? prompts.filter((p) => p.tags.includes(selectedTag))
    : prompts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Profile header */}
      <PageHeader />

      {/* Header with back button */}
      <div className="max-w-2xl mx-auto w-full px-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
        >
          <span>←</span>
          <span>{t('common.back')}</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t('prompts.title')}
        </h1>
        <p className="text-slate-600 mb-8">{t('prompts.description')}</p>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              selectedTag === null
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('common.all')}
          </button>
          {allTagIds.map((tagId) => {
            const isSelected = selectedTag === tagId;
            return (
              <button
                key={tagId}
                onClick={() => setSelectedTag(isSelected ? null : tagId)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'ring-2 ring-offset-1 ring-slate-500 ' + getTagColor(tagId)
                    : getTagColor(tagId) + ' opacity-70 hover:opacity-100'
                }`}
              >
                {t(`tags.${tagId}`)}
              </button>
            );
          })}
        </div>

        {/* Prompts grid */}
        <div className="space-y-8">
          {filteredPrompts.map((prompt) => {
            const hasVariants = prompt.variants === 'gender';
            const activeVariant = getGenderVariant(prompt.id);

            return (
              <div
                key={prompt.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors"
              >
                {/* Image container */}
                <div className="w-full bg-slate-100 flex items-center justify-center">
                  <img
                    src={prompt.image}
                    alt={t(`prompts.${prompt.id}.title`)}
                    className="w-full object-contain"
                  />
                </div>

                {/* Content container */}
                <div className="p-6">
                  {/* Tags + copy link */}
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
                      onClick={() => handleCopyLink(prompt.id)}
                      title={t('common.shareLink')}
                      className={`p-1.5 rounded-lg border transition-colors flex-shrink-0 ${
                        linkCopiedId === prompt.id
                          ? 'text-green-600 border-green-300 bg-green-50'
                          : 'text-slate-400 border-slate-200 bg-slate-50 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {linkCopiedId === prompt.id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <Link to={`/prompts/${prompt.id}`}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 underline cursor-pointer">
                      {t(`prompts.${prompt.id}.title`)}
                    </h2>
                  </Link>

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
                              onClick={() =>
                                setGenderVariants((prev) => ({ ...prev, [prompt.id]: variant }))
                              }
                              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                                activeVariant === variant
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
                      value={getPromptText(prompt.id, hasVariants, activeVariant)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
                      rows={4}
                    />
                  </div>

                  <button
                    onClick={() => handleCopyPrompt(prompt.id, hasVariants)}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      copiedId === prompt.id
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-700 text-white hover:bg-slate-800'
                    }`}
                  >
                    {copiedId === prompt.id ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
}
