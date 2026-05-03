import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from 'react-router-dom';
import { prompts } from '../config/prompts';
import { PageHeader } from '../components/PageHeader';
import { PromptCard } from '../components/PromptCard';

export function PromptDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const prompt = prompts.find((p) => p.id === id);
  if (!prompt) return <Navigate to="/prompts" replace />;

  const otherPrompts = prompts.filter((p) => p.id !== prompt.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <PageHeader />

      <div className="max-w-2xl mx-auto w-full px-4 py-3">
        <Link
          to="/prompts"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
        >
          <span>←</span>
          <span>{t('common.back')}</span>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 flex-1">
        <PromptCard prompt={prompt} mode="detail" />
      </div>

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
