import { writable } from 'svelte/store';

// Export the main component for external consumption (library entry point)
export { default as SvelteTheme } from './SvelteTheme.svelte';

export interface ThemeStore {
	/** List of all available theme names */
	themes: string[];
	/** Forced theme name for the current page */
	forcedTheme?: string;
	/** Active theme name */
	theme?: string;
	/** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
	resolvedTheme?: string;
	/** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
	systemTheme?: 'dark' | 'light';
}

export const setTheme = (theme: string): void =>
	themeStore.update((store) => ({ ...store, theme }));
const themeStore = writable<ThemeStore>({
	themes: [],
	forcedTheme: undefined,
	theme: undefined,
	resolvedTheme: undefined,
	systemTheme: undefined
});
export default themeStore;
