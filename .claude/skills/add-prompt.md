# add-prompt

Guided workflow for adding a new prompt to gabrieltargon's personal site.

## Step 1 — Gather all information upfront

Ask the user for ALL of the following in a single message. Do not proceed until you have received answers:

1. **Image filename** — the exact filename already placed in `public/prompts/` (e.g. `ChatGPT - My Prompt.jpg`)
2. **Title** — one language is enough; generate or translate the other. If omitted, generate a title from the prompt text.
3. **Description** — optional; if omitted, write one in both languages based on the prompt text and title.
4. **Prompt text** — provide it in one language (EN or PT-BR). You will translate to the other.
5. **Tags** — pick from existing tag IDs: `chatgpt`, `claude`, `gemini`, `image`, `text`, `video`. If a needed tag doesn't exist, say so and ask for a label; you will add it.
6. **Variants** — optional. Describe the variant (e.g. "gender: feminine and masculine versions"). If the prompt uses gender variants, provide both `textFeminine` and `textMasculine` (one language each is fine; translate the rest). If a non-gender variant is described, flag that `PromptCard` may need adjustment and ask the user to confirm before proceeding.
7. **Requires photo?** — does the user need to upload a photo to use this prompt? (yes/no)

---

## Step 2 — Derive computed values

Once you have the user's answers:

- **Prompt ID**: kebab-case from the English title (e.g. "No Pain No Gain" → `chatgpt-no-pain-no-gain`). Prefix with the primary tool tag (e.g. `chatgpt-`, `claude-`).
- **Category**: infer from tags — `chatgpt` + `image` → `chatgpt-image`; `chatgpt` + `text` → `chatgpt-text`; `claude` → `claude`. If ambiguous, ask.
- **Translations**: translate any missing language versions of title, description, and prompt text. Match the tone and style of existing entries in `src/locales/en.json` and `src/locales/pt-br.json`.

---

## Step 3 — Implement the changes

Make all file edits in this order:

### 3a. `src/config/prompts.ts`

Append a new entry to the `prompts` array:

```ts
{
  id: '<id>',
  image: '/prompts/<image-filename>',
  category: '<category>',
  tags: ['<tag1>', '<tag2>'],
  requiresPhoto: true,          // only if requires photo
  variants: 'gender',           // only if gender variants
},
```

If new tags are needed, add them to the `tags` record and `getTagColor` switch statements with an appropriate color (follow existing color patterns).

### 3b. `src/locales/en.json`

Add under `"prompts"`:

```json
"<id>": {
  "title": "...",
  "description": "...",
  "text": "..."
}
```

For gender variants use `"textFeminine"` and `"textMasculine"` instead of `"text"`.

If new tags were added, add them under `"tags"` too.

### 3c. `src/locales/pt-br.json`

Mirror the same keys as 3b with Portuguese translations. Keep the same key structure exactly.

---

## Step 4 — Quality checks

Run these commands in sequence and stop if any fails:

```bash
npm run lint
npm run test
npm run build
```

Fix any errors before continuing. Do not skip checks.

---

## Step 5 — Commit and open PR

1. Ensure you are on the `develop` branch (check with `git branch --show-current`; if not, checkout `develop`).
2. Create a feature branch from `develop`:
   ```bash
   git checkout -b prompt/<prompt-id>
   ```
3. Stage only the files you changed:
   - `src/config/prompts.ts`
   - `src/locales/en.json`
   - `src/locales/pt-br.json`
4. Commit with a clear message:
   ```
   Add prompt: <English title>
   ```
5. Push and open a PR targeting `main`:
   ```bash
   gh pr create --base main --title "Add prompt: <English title>" --body "..."
   ```
   PR body should include: what the prompt does, tags, variants if any, and a checklist (lint ✅, tests ✅, build ✅).
6. Return the PR URL to the user so they can review and merge.

**Never merge to main.** The user reviews and merges the PR.
