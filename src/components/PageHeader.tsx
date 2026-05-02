import { profile } from '../config/links';
import { LanguageSwitcher } from './LanguageSwitcher';

export function PageHeader() {
  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="relative w-full px-4 py-6">
      {/* Center content */}
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-white">{initials}</span>
          </div>
        )}
        <div>
          <p className="text-base font-semibold text-slate-900">{profile.name}</p>
        </div>
      </div>

      {/* Language selector - positioned absolutely on the right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
