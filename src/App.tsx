import { links, socialLinks } from './config/links';
import { LinkButton } from './components/LinkButton';
import { Profile } from './components/Profile';
import { SocialLinks } from './components/SocialLinks';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
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
        <p className="text-center text-sm text-gray-400 mt-8">© 2026 Gabriel Targon</p>
      </footer>
    </div>
  );
}
