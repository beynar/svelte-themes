// This is to allow the class to react to some SvelteThemProps changes
// If we pass getter/setter as options, they will be reflect on the class.
import { getContext, onMount, setContext, untrack } from 'svelte';
import {} from '.';
import { disableAnimation } from './helpers';
const browser = typeof window !== 'undefined';
import { colorSchemes, MEDIA } from './constants';
import { MediaQuery } from 'svelte/reactivity';
import { on } from 'svelte/events';
export class Theme {
    options;
    #theme = $state();
    colorsScheme = new MediaQuery(MEDIA);
    systemTheme = $derived(this.colorsScheme.current ? 'dark' : 'light');
    constructor(options) {
        this.options = options;
        this.getInitialTheme();
        onMount(() => on(window, 'storage', this.storageHandler, {}));
        setContext('theme', this);
        $effect(() => {
            this.resolvedTheme;
            untrack(() => {
                const enable = this.options.disableTransitionOnChange ? disableAnimation() : null;
                this.applyThemeToDOM();
                this.setColorScheme();
                enable?.();
            });
        });
    }
    getInitialTheme() {
        if (!browser)
            return undefined;
        let theme;
        try {
            theme = localStorage.getItem(this.options.storageKey) || undefined;
        }
        catch {
            // Unsupported
        }
        // Validate that the stored theme is in the allowed themes list
        if (theme && !this.options.themes.includes(theme)) {
            theme = this.options.defaultTheme;
        }
        this.#theme = theme || this.options.defaultTheme;
    }
    storageHandler = (e) => {
        if (e.key !== this.options.storageKey)
            return;
        const newValue = e.newValue;
        // Handle case where another tab set theme to 'system' but enableSystem is false
        if (newValue === 'system' && !this.options.enableSystem) {
            this.#theme = this.options.defaultTheme;
            this.setThemeStorage(this.options.defaultTheme); // Update localStorage to reflect the change
        }
        else if (newValue && this.options.themes.includes(newValue)) {
            // trigger set trap;
            this.#theme = newValue;
        }
        else {
            this.getInitialTheme();
        }
    };
    validateTheme(newTheme) {
        // Skip validation if themes array is empty (during initialization)
        // or if newTheme is undefined
        if (!newTheme || this.options.themes.length === 0) {
            return;
        }
        if (!this.options.themes.includes(newTheme)) {
            throw new Error(`svelte-themes: Invalid theme "${newTheme}". Currently loaded themes are: [${this.options.themes.join(', ')}]`);
        }
    }
    setColorScheme() {
        if (this.options.enableColorScheme && browser && this.resolvedTheme) {
            const colorScheme = this.options.colorScheme?.[this.resolvedTheme] ||
                colorSchemes.find((c) => c === this.resolvedTheme) ||
                (this.current === 'system' && this.systemTheme ? this.systemTheme : undefined);
            const root = document.documentElement.style;
            if (colorScheme) {
                root.setProperty('color-scheme', colorScheme);
            }
            else {
                // Remove the color-scheme property if no matching color scheme is found
                root.removeProperty('color-scheme');
            }
        }
    }
    applyThemeToDOM() {
        if (!browser)
            return;
        const element = document.documentElement;
        if (this.options.attribute === 'class') {
            // Remove all possible class values (both original theme names and mapped values)
            const classesToRemove = this.options.themes.flatMap((theme) => [
                theme, // Original theme name
                this.options.value?.[theme] || theme // Mapped value if exists
            ]);
            element.classList.remove(...classesToRemove);
            if (this.resolvedTheme) {
                // Apply custom value if provided, same as data attributes
                const classValue = this.options.value?.[this.resolvedTheme] || this.resolvedTheme;
                element.classList.add(classValue);
            }
        }
        else {
            // Apply custom value if provided
            const value = this.options.value?.[this.resolvedTheme] || this.resolvedTheme;
            if (value) {
                element.setAttribute(this.options.attribute, value);
            }
        }
    }
    setThemeStorage(theme) {
        try {
            localStorage.setItem(this.options.storageKey, theme);
            return true;
        }
        catch {
            return false;
        }
    }
    get current() {
        return this.#theme;
    }
    get themes() {
        return this.options.themes;
    }
    resolvedTheme = $derived.by(() => {
        if (typeof this.options.forcedTheme === 'string') {
            return this.options.forcedTheme;
        }
        if (this.options.enableSystem && this.systemTheme && this.#theme === 'system') {
            return this.systemTheme;
        }
        return this.#theme;
    });
    set current(theme) {
        if (this.options.forcedTheme) {
            // Theme is forced, we shouldn't allow user to change the theme
            return;
        }
        if (theme) {
            this.validateTheme(theme);
            this.#theme = theme;
            this.setThemeStorage(theme);
        }
    }
}
export const useTheme = () => {
    const theme = getContext('theme');
    if (!theme) {
        throw new Error('Theme context not found');
    }
    return theme;
};
