import { writable } from 'svelte/store';
// Export the main component for external consumption (library entry point)
export { default as SvelteTheme } from './SvelteTheme.svelte';
function createThemeStore() {
    const { subscribe, set, update } = writable({
        themes: [],
        forcedTheme: undefined,
        theme: undefined,
        resolvedTheme: undefined,
        systemTheme: undefined
    });
    function validateTheme(store, newTheme) {
        // Skip validation if themes array is empty (during initialization)
        // or if newTheme is undefined
        if (!newTheme || store.themes.length === 0) {
            return;
        }
        if (!store.themes.includes(newTheme)) {
            throw new Error(`svelte-themes: Invalid theme "${newTheme}". Currently loaded themes are: [${store.themes.join(', ')}]`);
        }
    }
    return {
        subscribe,
        set: (value) => {
            validateTheme(value, value.theme);
            set(value);
        },
        update: (fn) => {
            update((currentValue) => {
                const newValue = fn(currentValue);
                validateTheme(currentValue, newValue.theme);
                return newValue;
            });
        }
    };
}
export const setTheme = (theme) => {
    themeStore.update((store) => ({ ...store, theme }));
};
const themeStore = createThemeStore();
export default themeStore;
