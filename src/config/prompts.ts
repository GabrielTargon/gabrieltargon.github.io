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

export const prompts: Prompt[] = [
  {
    id: 'chatgpt-hairstyle',
    image: 'prompts/ChatGPT - Hairstyle analysis.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
  },
  {
    id: 'chatgpt-color-analysis',
    image: 'prompts/ChatGPT - Personal color analysis.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
  },
  {
    id: 'chatgpt-action-figure',
    image: 'prompts/ChatGPT - Action figure.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
  },
  {
    id: 'chatgpt-isometric-studio',
    image: 'prompts/ChatGPT - Minimalist isometric 3D.jpg',
    category: 'chatgpt-image',
    tags: ['chatgpt', 'image'],
  },
];
