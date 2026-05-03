# CLAUDE.md

## Project

Personal website / link-in-bio for Gabriel Targon. Features a home page (link tree), a prompts gallery, and individual prompt detail pages. Deployed to GitHub Pages via GitHub Actions.

## Stack

- **React 18** + **TypeScript** (strict) + **Vite**
- **Tailwind CSS v3** — all styling via utility classes, no CSS modules or custom stylesheets
- **React Router v7** — client-side SPA routing
- **react-i18next** — bilingual UI (English `en` + Brazilian Portuguese `pt-BR`)
- **Vitest** — unit tests for config integrity and locale sync

## Commands

```bash
npm run dev       # start dev server
npm run build     # type-check + build to dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint — zero warnings allowed
npm run test      # run unit tests (vitest) — run after any config/locale change
npm run test:watch  # vitest in watch mode during development
```

## Architecture

```
src/
├── config/        # Source of truth for all site data
│   ├── links.ts   # Home page links + social links + profile
│   └── prompts.ts # Prompt metadata, tag definitions, tag color logic
├── components/    # Reusable UI components
├── context/       # React context (LanguageContext wraps i18n)
├── locales/       # Translation files — must always stay in sync
│   ├── en.json
│   └── pt-br.json
├── pages/         # Route-level components (Home, Prompts, PromptDetail)
└── main.tsx

public/            # Static assets served as-is (images, icons, SVGs)
```

## Coding Conventions

### Components

- Named exports only: `export function MyComponent`
- Explicit `interface Props` typed at the top of the file
- Order inside a component: hooks → derived values → handlers → return JSX

### TypeScript

- Never use `any` — use proper types or `unknown`
- Prefer discriminated unions over optional fields for variant shapes
- `interface` for component props, `type` for aliases and unions

### Styling

- Tailwind utility classes only — never write custom CSS unless there is no Tailwind equivalent
- Mobile-first: base classes target mobile, `sm:` and above for larger screens
- Established color roles: `slate` (primary UI), `green` (success/copy), `sky` (info notices)
- Use Tailwind's spacing/sizing scale — no arbitrary pixel values unless unavoidable

### Icons

- Inline SVG only — no icon library imports
- Decorative icons: add `aria-hidden="true"`
- Interactive icon-only buttons: add `aria-label`

## i18n — Non-Negotiable Rule

Every user-visible string MUST go through `t()`. Never hardcode text in JSX.

**When adding or changing any text, update BOTH files:**
1. `src/locales/en.json`
2. `src/locales/pt-br.json`

A key present in one file but missing in the other is a bug.

Translation key namespace:
| Prefix | Purpose |
|---|---|
| `common.*` | Shared UI labels (buttons, generic copy) |
| `nav.*` | Navigation labels |
| `profile.*` | Profile section |
| `links.*` | Home page link cards |
| `prompts.*` | Prompt content and prompt UI |
| `tags.*` | Tag display labels |

## Data Patterns

### Adding a new prompt

1. Add the result image to `public/prompts/`
2. Add an entry to `prompts[]` in `src/config/prompts.ts` with a unique kebab-case `id`
3. Add any new tags to the `tags` record in the same file
4. Add translation keys to **both** locale files:
   - `prompts.<id>.title`
   - `prompts.<id>.description`
   - `prompts.<id>.text` — OR — `prompts.<id>.textFeminine` + `prompts.<id>.textMasculine` if using gender variants
5. Add new tag labels to `tags.*` in both locale files if needed

### Adding a home page link

1. Add entry to `links[]` in `src/config/links.ts`
2. Set `internal: true` for internal routes; omit for external URLs
3. Add `links.<id>.title` and `links.<id>.description` to both locale files
4. Place the button icon in `public/buttons/`

### Adding a social link

1. Add entry to `socialLinks[]` in `src/config/links.ts`
2. Icon must be an SVG or PNG in `public/icons/`

## Quality Rules

**Scope**: Only change what the task requires. Don't refactor surrounding code, add abstractions, or introduce new patterns unless asked.

**No hardcoded text**: Everything user-visible must go through `t()`.

**Accessibility**:
- Use semantic HTML — `<button>` not `<div onClick>`, `<nav>` not `<div>`
- All `<img>` tags need descriptive `alt` text (or `alt=""` for decorative images)
- Icon-only interactive elements need `aria-label` or `title`

**Responsive**: Every UI change must work on mobile. The main content column is `max-w-md` — respect that constraint before adding anything wide.

**State management**: Default to local `useState`. Don't reach for context or global state unless data genuinely needs to be shared across unrelated components.

**Dependencies**: Don't add npm packages without a clear justification. The stack is intentionally minimal.

**Comments**: Only when the WHY is non-obvious — a hidden constraint, a workaround for a specific bug, a subtle invariant. Never describe what the code does.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`.

The `public/404.html` + `sessionStorage` redirect in `App.tsx` handles SPA routing on GitHub Pages — do not remove or break this mechanism.

Work on `develop`, merge to `main` via PR.
