# Gabriel Targon - Personal Bio Site

A modern, clean, and scalable personal website for Instagram bio links. Built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- 📱 Mobile-first responsive design
- ⚡ Fast development with Vite
- 🎨 Beautiful gradient UI with Tailwind CSS
- 📦 Scalable architecture for future growth
- 🔗 Easy link management via configuration
- ♿ Accessible and SEO-friendly

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **PostCSS & Autoprefixer** - CSS processing

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── LinkButton.tsx   # Link button component
│   └── Profile.tsx      # Profile header component
├── config/
│   └── links.ts         # Links and profile data
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Adding New Links

Edit `src/config/links.ts` and add items to the `links` array:

```typescript
{
  id: 'unique-id',
  title: 'Link Title',
  url: 'https://example.com',
  description: 'Optional description',
}
```

## Customization

- **Profile Info**: Edit `profile` object in `src/config/links.ts`
- **Colors**: Modify Tailwind classes in components or extend `tailwind.config.js`
- **Layout**: Adjust component styles in `src/components/`

## Deployment

Deploy to GitHub Pages, Netlify, Vercel, or any static hosting:

```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

## Future Enhancements

- Analytics tracking
- Dark mode support
- Social media icons
- Custom themes
- Admin dashboard for link management
- Blog section
- Contact form

## License

MIT
