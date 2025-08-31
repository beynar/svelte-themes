export const colorSchemes = ['light', 'dark'] as const;
export type ColorScheme = (typeof colorSchemes)[number];

export const MEDIA = '(prefers-color-scheme: dark)';
