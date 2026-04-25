import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import ptBrTranslations from '../locales/pt-BR.json';

const resources = {
  en: { translation: enTranslations },
  'pt-BR': { translation: ptBrTranslations },
};

// Get language from localStorage or browser language
const getInitialLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved) return saved;

  // Try to match browser language
  const browserLang = navigator.language;
  if (browserLang.startsWith('pt')) return 'pt-BR';
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
