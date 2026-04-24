export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  description?: string;
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string; // Path to icon in public folder or URL
}

export const links: Link[] = [
  {
    id: 'pex',
    title: 'Pex (App Store)',
    url: 'https://apps.apple.com/br/app/pex-watch-face-pet-ai/id6465689770?l=en-GB',
    description: 'My tamagotchi AI app',
    icon: 'buttons/pex-icon-light.jpg',
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/gabriel.targon/',
    icon: '/icons/instagram.svg',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gabrieltargon/',
    icon: '/icons/linkedin.svg',
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'https://github.com/GabrielTargon',
    icon: '/icons/github.svg',
  },
  {
    id: 'email',
    title: 'Email',
    url: 'mailto:gabrieltargon@gmail.com',
    icon: '/icons/email-50.png',
  },
];

export const profile = {
  name: 'Gabriel Targon',
  subtitle: 'Developer & Creator',
  bio: 'Building awesome digital experiences',
  avatar: '/avatar.jpg', // Add your image to the public folder
};
