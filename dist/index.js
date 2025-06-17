import { writable } from 'svelte/store';
// Export the main component
export { default as SvelteTheme } from './SvelteTheme.svelte';
export const setTheme = (theme) => themeStore.update((store) => ({ ...store, theme }));
const themeStore = writable({
    themes: [],
    forcedTheme: undefined,
    theme: undefined,
    resolvedTheme: undefined,
    systemTheme: undefined
});
export default themeStore;
