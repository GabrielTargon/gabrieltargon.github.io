import { SocialLink } from '../config/links';

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex justify-center gap-6 mt-12">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.title}
          className="group relative"
        >
          <img
            src={link.icon}
            alt={link.title}
            className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 transform hover:scale-110"
          />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {link.title}
          </span>
        </a>
      ))}
    </div>
  );
}
