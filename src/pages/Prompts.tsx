import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { prompts, getTagColor } from '../config/prompts';
import { PageHeader } from '../components/PageHeader';
import { PromptCard } from '../components/PromptCard';

const allTagIds = Array.from(new Set(prompts.flatMap((p) => p.tags)));

export function Prompts() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPrompts = selectedTag
    ? prompts.filter((p) => p.tags.includes(selectedTag))
    : prompts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <PageHeader />

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

        {/* Prompts list */}
        <div className="space-y-8">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} mode="list" />
          ))}
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
}
