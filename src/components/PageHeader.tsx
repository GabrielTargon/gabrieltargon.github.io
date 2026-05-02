import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { profile } from '../config/links';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PageHeaderProps {
  showProfile?: boolean;
  showMenu?: boolean;
}

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.prompts', to: '/prompts' },
];

export function PageHeader({ showProfile = true, showMenu = true }: PageHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const initials = profile.name.split(' ').map(n => n[0]).join('');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="w-full px-4 pt-5 pb-4 flex items-center">
      {/* Hamburger menu - left side */}
      {showMenu ? (
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex flex-col justify-center gap-1.5 w-8 h-8 items-center rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>

          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
              {navItems.map(item => (
                <button
                  key={item.to}
                  onClick={() => { setMenuOpen(false); navigate(item.to); }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-8" />
      )}

      {/* Profile - center */}
      <div className="flex-1 flex justify-center">
        {showProfile && (
          <Link to="/" className="flex items-center gap-2">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-slate-200"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">{initials}</span>
              </div>
            )}
            <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
          </Link>
        )}
      </div>

      {/* Language selector - right side */}
      <LanguageSwitcher />
    </div>
  );
}
