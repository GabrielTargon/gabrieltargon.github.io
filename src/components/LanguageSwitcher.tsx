import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 bg-white rounded-lg shadow-md p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
          language === 'en'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('pt-BR')}
        className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
          language === 'pt-BR'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        PT
      </button>
    </div>
  );
}
