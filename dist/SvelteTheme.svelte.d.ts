interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const SvelteTheme: $$__sveltets_2_IsomorphicComponent<{
    /** Forced theme name for the current page */ forcedTheme?: string | undefined;
    /** Disable all CSS transitions when switching themes */ disableTransitionOnChange?: boolean;
    /** Whether to switch between dark and light themes based on prefers-color-scheme */ enableSystem?: boolean;
    /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */ enableColorScheme?: boolean;
    /** Key used to store theme setting in localStorage */ storageKey?: string;
    /** List of all available theme names */ themes?: string[];
    /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */ defaultTheme?: string;
    /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */ attribute?: string | "class";
    /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */ value?: {
        [themeName: string]: string;
    } | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type SvelteTheme = InstanceType<typeof SvelteTheme>;
export default SvelteTheme;
