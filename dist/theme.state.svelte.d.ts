import { type SvelteThemeProps } from '.';
import { MediaQuery } from 'svelte/reactivity';
interface ThemeOptions extends Pick<SvelteThemeProps<any[]>, 'attribute' | 'forcedTheme' | 'enableSystem' | 'enableColorScheme' | 'value' | 'themes' | 'storageKey' | 'colorScheme' | 'disableTransitionOnChange'> {
    themes: string[];
    defaultTheme: string;
    storageKey: string;
}
export declare class Theme {
    #private;
    private options;
    colorsScheme: MediaQuery;
    systemTheme: "light" | "dark";
    constructor(options: ThemeOptions);
    private getInitialTheme;
    private storageHandler;
    private validateTheme;
    private setColorScheme;
    private applyThemeToDOM;
    private setThemeStorage;
    get current(): string;
    get themes(): string[];
    resolvedTheme: string;
    set current(theme: string | undefined);
}
export declare const useTheme: () => Theme;
export {};
