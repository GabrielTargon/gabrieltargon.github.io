import { Link } from '../config/links';

interface LinkButtonProps {
  link: Link;
}

export function LinkButton({ link }: LinkButtonProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-between gap-4"
    >
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg">{link.title}</span>
        {link.description && (
          <span className="text-sm opacity-90 font-normal">{link.description}</span>
        )}
      </div>
      {link.icon && (
        <img
          src={link.icon}
          alt={link.title}
          className="w-12 h-12 rounded object-cover flex-shrink-0 shadow-sm"
        />
      )}
    </a>
  );
}
