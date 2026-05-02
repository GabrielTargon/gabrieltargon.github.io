import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { links, socialLinks } from './config/links';
import { LinkButton } from './components/LinkButton';
import { Profile } from './components/Profile';
import { SocialLinks } from './components/SocialLinks';
import { PageHeader } from './components/PageHeader';
import { LanguageProvider } from './context/LanguageContext';
import { Prompts } from './components/Prompts';
import { PromptDetail } from './components/PromptDetail';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <PageHeader />

      <div className="max-w-md mx-auto px-4 py-12 sm:py-20 flex-1">
        <Profile />

        <div className="space-y-4">
          {links.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>
      </div>

      <footer className="pb-8">
        <SocialLinks links={socialLinks} />
        <p className="text-center text-sm text-gray-400 mt-8">{t('common.copyright')}</p>
      </footer>
    </div>
  );
}

function RouteRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect && window.location.pathname === '/') {
      delete sessionStorage.redirect;
      navigate(redirect);
    }
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteRedirector />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
