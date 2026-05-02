import { profile } from '../config/links';

export function PageHeader() {
  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6 flex items-center justify-center gap-3">
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
  );
}
