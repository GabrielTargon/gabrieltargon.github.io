export type TagType = 'tool' | 'content';

export interface Tag {
  id: string;
  label: string;
  type: TagType;
}

export interface Prompt {
  id: string;
  image: string;
  category: 'chatgpt-image' | 'chatgpt-text' | 'claude';
  tags: string[]; // Array of tag IDs
  requiresPhoto?: boolean;
  variants?: 'gender';
}

export const tags: Record<string, Tag> = {
  // Tools
  'chatgpt': { id: 'chatgpt', label: 'ChatGPT', type: 'tool' },
  'claude': { id: 'claude', label: 'Claude', type: 'tool' },
  'gemini': { id: 'gemini', label: 'Gemini', type: 'tool' },
  // Content types
  'image': { id: 'image', label: 'Image', type: 'content' },
  'text': { id: 'text', label: 'Text', type: 'content' },
  'video': { id: 'video', label: 'Video', type: 'content' },
};

export function getTagColor(tagId: string): string {
  const tag = tags[tagId];
  if (!tag) return 'bg-slate-200 text-slate-700';

  if (tag.type === 'tool') {
    switch (tagId) {
      case 'chatgpt': return 'bg-green-100 text-green-800';
      case 'claude': return 'bg-orange-100 text-orange-800';
      case 'gemini': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-200 text-slate-700';
    }
  }

  if (tag.type === 'content') {
    switch (tagId) {
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'text': return 'bg-pink-100 text-pink-800';
      case 'video': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-200 text-slate-700';
    }
  }

  return 'bg-slate-200 text-slate-700';
}

export const prompts: Prompt[] = [
  {
    id: 'chatgpt-no-pain-no-gain',
    image: '/prompts/ChatGPT - No pain, no gain.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
    variants: 'gender',
  },
  {
    id: 'chatgpt-child-and-actual',
    image: '/prompts/ChatGPT - Child and actual version of me.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
  {
    id: 'chatgpt-instagram-children-draw',
    image: '/prompts/ChatGPT - Instagram profile children draw.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
  {
    id: 'chatgpt-hairstyle',
    image: '/prompts/ChatGPT - Hairstyle analysis.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
  {
    id: 'chatgpt-color-analysis',
    image: '/prompts/ChatGPT - Personal color analysis.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
  {
    id: 'chatgpt-action-figure',
    image: '/prompts/ChatGPT - Action figure.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
  {
    id: 'chatgpt-isometric-studio',
    image: '/prompts/ChatGPT - Minimalist isometric 3D.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
    requiresPhoto: true,
  },
];
