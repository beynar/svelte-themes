import { type Snippet } from 'svelte';
import type { Theme } from './theme.state.svelte';
import type { ColorScheme } from './constants';

export type SvelteThemeProps<T extends readonly string[]> = {
	/** Forced theme name for the current page */
	forcedTheme?: string;
	/** Disable all CSS transitions when switching themes */
	disableTransitionOnChange?: boolean;
	/** Whether to switch between dark and light themes based on prefers-color-scheme */
	enableSystem?: boolean;
	/** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
	enableColorScheme?: boolean;
	/** Key used to store theme setting in localStorage */
	storageKey?: string;
	/** List of all available theme names */
	themes?: T;
	/** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
	defaultTheme?: T[number];
	/** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
	attribute?: (string & {}) | 'class';
	/** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
	value?: Partial<Record<T[number], string>>;
	/** Mapping of theme name to color scheme. Object where key is the theme name and value is the color scheme */
	colorScheme?: Partial<Record<T[number], ColorScheme>>;
	children?: Snippet<[Theme]>;
};
// Export the main component for external consumption (library entry point)
export { default as SvelteTheme } from './SvelteTheme.svelte';
export { type ThemeOptions, Theme, useTheme } from './theme.state.svelte';
