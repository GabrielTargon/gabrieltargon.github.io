import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { prompts, tags } from '../config/prompts';

export function Prompts() {
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (promptId: string) => {
    const promptText = t(`prompts.${promptId}.text`);
    navigator.clipboard.writeText(promptText);
    setCopiedId(promptId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTagColor = (tagId: string) => {
    const tag = tags[tagId];
    if (!tag) return 'bg-slate-200 text-slate-700';

    // Tool colors
    if (tag.type === 'tool') {
      switch (tagId) {
        case 'chatgpt':
          return 'bg-green-100 text-green-800';
        case 'claude':
          return 'bg-orange-100 text-orange-800';
        case 'gemini':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-slate-200 text-slate-700';
      }
    }

    // Content type colors
    if (tag.type === 'content') {
      switch (tagId) {
        case 'image':
          return 'bg-purple-100 text-purple-800';
        case 'text':
          return 'bg-pink-100 text-pink-800';
        case 'video':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-slate-200 text-slate-700';
      }
    }

    return 'bg-slate-200 text-slate-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header with back button */}
      <div className="max-w-2xl mx-auto w-full px-4 py-6">
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
        <p className="text-slate-600 mb-12">{t('prompts.description')}</p>

        {/* Prompts grid */}
        <div className="space-y-8">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors"
            >
              {/* Image container - shows full image without cropping */}
              <div className="w-full bg-slate-100 flex items-center justify-center">
                <img
                  src={prompt.image}
                  alt={t(`prompts.${prompt.id}.title`)}
                  className="w-full object-contain"
                />
              </div>

              {/* Content container */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {prompt.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagColor(
                        tagId
                      )}`}
                    >
                      {t(`tags.${tagId}`)}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {t(`prompts.${prompt.id}.title`)}
                </h2>

                {/* Description - directly under title */}
                {t(`prompts.${prompt.id}.description`) && (
                  <p className="text-slate-600 text-sm mb-6">
                    {t(`prompts.${prompt.id}.description`)}
                  </p>
                )}

                {/* Prompt text with copy button below */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    {t('prompts.promptLabel')}
                  </label>
                  <textarea
                    readOnly
                    value={t(`prompts.${prompt.id}.text`)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
                    rows={4}
                  />
                </div>

                {/* Copy button below textarea */}
                <button
                  onClick={() => handleCopyPrompt(prompt.id)}
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
          ))}
        </div>
      </div>

      {/* Footer spacing */}
      <div className="pb-8" />
    </div>
  );
}
