import { describe, it, expect } from 'vitest';
import { prompts } from '../config/prompts';
import en from './en.json';
import ptBr from './pt-br.json';

// Flatten a nested object into dot-notation keys: { a: { b: 1 } } → ["a.b"]
function flatKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return value !== null && typeof value === 'object'
      ? flatKeys(value as object, fullKey)
      : [fullKey];
  });
}

describe('locale files are in sync', () => {
  const enKeys = new Set(flatKeys(en));
  const ptBrKeys = new Set(flatKeys(ptBr));

  it('every key in en.json exists in pt-br.json', () => {
    const missing = [...enKeys].filter((k) => !ptBrKeys.has(k));
    expect(missing, `Keys in en.json missing from pt-br.json: ${missing.join(', ')}`).toHaveLength(0);
  });

  it('every key in pt-br.json exists in en.json', () => {
    const extra = [...ptBrKeys].filter((k) => !enKeys.has(k));
    expect(extra, `Keys in pt-br.json missing from en.json: ${extra.join(', ')}`).toHaveLength(0);
  });
});

describe('every prompt has complete translation keys', () => {
  it('has title and description in both locales', () => {
    for (const prompt of prompts) {
      const enPrompt = (en.prompts as Record<string, unknown>)[prompt.id];
      const ptPrompt = (ptBr.prompts as Record<string, unknown>)[prompt.id];

      expect(enPrompt, `en.json is missing prompts.${prompt.id}`).toBeDefined();
      expect(ptPrompt, `pt-br.json is missing prompts.${prompt.id}`).toBeDefined();

      const enP = enPrompt as Record<string, string>;
      const ptP = ptPrompt as Record<string, string>;

      expect(enP.title, `en.json prompts.${prompt.id}.title`).toBeTruthy();
      expect(ptP.title, `pt-br.json prompts.${prompt.id}.title`).toBeTruthy();
      expect(enP.description, `en.json prompts.${prompt.id}.description`).toBeTruthy();
      expect(ptP.description, `pt-br.json prompts.${prompt.id}.description`).toBeTruthy();
    }
  });

  it('gender-variant prompts have textFeminine and textMasculine (not text)', () => {
    for (const prompt of prompts.filter((p) => p.variants === 'gender')) {
      const enP = (en.prompts as Record<string, Record<string, string>>)[prompt.id];
      const ptP = (ptBr.prompts as Record<string, Record<string, string>>)[prompt.id];

      expect(enP?.textFeminine, `en.json prompts.${prompt.id}.textFeminine`).toBeTruthy();
      expect(enP?.textMasculine, `en.json prompts.${prompt.id}.textMasculine`).toBeTruthy();
      expect(ptP?.textFeminine, `pt-br.json prompts.${prompt.id}.textFeminine`).toBeTruthy();
      expect(ptP?.textMasculine, `pt-br.json prompts.${prompt.id}.textMasculine`).toBeTruthy();
      expect(enP?.text, `en.json prompts.${prompt.id} should not have "text" when using variants`).toBeUndefined();
    }
  });

  it('non-variant prompts have text (not textFeminine/textMasculine)', () => {
    for (const prompt of prompts.filter((p) => !p.variants)) {
      const enP = (en.prompts as Record<string, Record<string, string>>)[prompt.id];
      const ptP = (ptBr.prompts as Record<string, Record<string, string>>)[prompt.id];

      expect(enP?.text, `en.json prompts.${prompt.id}.text`).toBeTruthy();
      expect(ptP?.text, `pt-br.json prompts.${prompt.id}.text`).toBeTruthy();
      expect(enP?.textFeminine, `en.json prompts.${prompt.id} should not have "textFeminine"`).toBeUndefined();
      expect(enP?.textMasculine, `en.json prompts.${prompt.id} should not have "textMasculine"`).toBeUndefined();
    }
  });
});

describe('every tag has a translation in both locales', () => {
  it('all tag keys exist in both locale files', () => {
    const enTags = en.tags as Record<string, string>;
    const ptTags = ptBr.tags as Record<string, string>;

    const missingInEn = Object.keys(ptTags).filter((k) => !enTags[k]);
    const missingInPt = Object.keys(enTags).filter((k) => !ptTags[k]);

    expect(missingInEn, `Tags in pt-br.json missing from en.json: ${missingInEn.join(', ')}`).toHaveLength(0);
    expect(missingInPt, `Tags in en.json missing from pt-br.json: ${missingInPt.join(', ')}`).toHaveLength(0);
  });
});
