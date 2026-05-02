import { useLanguage } from '../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português (BR)' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: string) => {
    setLanguage(code as 'en' | 'pt-BR');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>{currentLanguage?.code === 'en' ? 'EN' : 'PT'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-max">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                language === lang.code
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${lang.code === 'en' ? 'rounded-t-lg' : 'rounded-b-lg'}`}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
