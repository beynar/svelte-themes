import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

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

function createThemeStore(): Writable<ThemeStore> {
	const { subscribe, set, update } = writable<ThemeStore>({
		themes: [],
		forcedTheme: undefined,
		theme: undefined,
		resolvedTheme: undefined,
		systemTheme: undefined
	});

	function validateTheme(store: ThemeStore, newTheme: string | undefined) {
		// Skip validation if themes array is empty (during initialization)
		// or if newTheme is undefined
		if (!newTheme || store.themes.length === 0) {
			return;
		}
		
		if (!store.themes.includes(newTheme)) {
			throw new Error(
				`svelte-themes: Invalid theme "${newTheme}". Currently loaded themes are: [${store.themes.join(', ')}]`
			);
		}
	}

	return {
		subscribe,
		set: (value: ThemeStore) => {
			validateTheme(value, value.theme);
			set(value);
		},
		update: (fn: (value: ThemeStore) => ThemeStore) => {
			update((currentValue) => {
				const newValue = fn(currentValue);
				validateTheme(currentValue, newValue.theme);
				return newValue;
			});
		}
	};
}

export const setTheme = (theme: string): void => {
	themeStore.update((store) => ({ ...store, theme }));
};

const themeStore = createThemeStore();
export default themeStore;
