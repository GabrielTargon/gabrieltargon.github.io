import { describe, it, expect } from 'vitest';
import { prompts, tags, getTagColor } from './prompts';

describe('tags', () => {
  it('every tag has a non-empty id, label, and type', () => {
    for (const [key, tag] of Object.entries(tags)) {
      expect(tag.id, `tags["${key}"].id`).toBe(key);
      expect(tag.label, `tags["${key}"].label`).toBeTruthy();
      expect(['tool', 'content'], `tags["${key}"].type`).toContain(tag.type);
    }
  });
});

describe('getTagColor', () => {
  it('returns the correct class for each known tool tag', () => {
    expect(getTagColor('chatgpt')).toBe('bg-green-100 text-green-800');
    expect(getTagColor('claude')).toBe('bg-orange-100 text-orange-800');
    expect(getTagColor('gemini')).toBe('bg-blue-100 text-blue-800');
  });

  it('returns the correct class for each known content tag', () => {
    expect(getTagColor('image')).toBe('bg-purple-100 text-purple-800');
    expect(getTagColor('text')).toBe('bg-pink-100 text-pink-800');
    expect(getTagColor('video')).toBe('bg-red-100 text-red-800');
  });

  it('returns the fallback class for an unknown tag', () => {
    expect(getTagColor('unknown-tag')).toBe('bg-slate-200 text-slate-700');
  });

  it('every tag in the registry has a non-fallback color', () => {
    const fallback = 'bg-slate-200 text-slate-700';
    for (const tagId of Object.keys(tags)) {
      expect(getTagColor(tagId), `getTagColor("${tagId}")`).not.toBe(fallback);
    }
  });
});

describe('prompts', () => {
  it('every prompt has a unique id', () => {
    const ids = prompts.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every prompt id is a non-empty kebab-case string', () => {
    for (const prompt of prompts) {
      expect(prompt.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('every tag referenced by a prompt exists in the tags registry', () => {
    for (const prompt of prompts) {
      for (const tagId of prompt.tags) {
        expect(tags, `prompt "${prompt.id}" references unknown tag "${tagId}"`).toHaveProperty(tagId);
      }
    }
  });

  it('every prompt has at least one tag', () => {
    for (const prompt of prompts) {
      expect(prompt.tags.length, `prompt "${prompt.id}" has no tags`).toBeGreaterThan(0);
    }
  });

  it('every prompt has a non-empty image path', () => {
    for (const prompt of prompts) {
      expect(prompt.image, `prompt "${prompt.id}" has no image`).toBeTruthy();
    }
  });

  it('every prompt has a valid category', () => {
    const validCategories = ['chatgpt-image', 'chatgpt-text', 'claude'];
    for (const prompt of prompts) {
      expect(validCategories, `prompt "${prompt.id}" has invalid category "${prompt.category}"`).toContain(prompt.category);
    }
  });
});
