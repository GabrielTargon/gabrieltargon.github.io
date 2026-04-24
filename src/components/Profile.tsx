import { profile } from '../config/links';

export function Profile() {
  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="text-center mb-12">
      <div className="mb-4">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-white"
          />
        ) : (
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">{initials}</span>
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
      <p className="text-xl text-gray-600 mb-2">{profile.subtitle}</p>
      <p className="text-gray-500">{profile.bio}</p>
    </div>
  );
}
