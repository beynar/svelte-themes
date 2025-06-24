interface Props {
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
    themes?: string[];
    /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
    defaultTheme?: string;
    /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
    attribute?: string | 'class';
    /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
    value?: {
        [themeName: string]: string;
    };
}
declare const SvelteTheme: import("svelte").Component<Props, {}, "">;
type SvelteTheme = ReturnType<typeof SvelteTheme>;
export default SvelteTheme;
