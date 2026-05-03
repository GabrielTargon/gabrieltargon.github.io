import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Home } from './pages/Home';
import { Prompts } from './pages/Prompts';
import { PromptDetail } from './pages/PromptDetail';

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
          <Route path="/" element={<Home />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
