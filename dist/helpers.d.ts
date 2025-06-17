export declare const getTheme: (key: string, fallback?: string) => string | undefined;
export declare const setThemeStorage: (key: string, value: string) => boolean;
export declare const resolveTheme: (theme: string, value?: {
    [key: string]: string;
}) => string;
export declare const getColorScheme: (theme: string | undefined, resolvedTheme: string | undefined, forcedTheme?: string) => string | null;
export declare const applyThemeToDOM: (element: HTMLElement, attribute: string, themeName: string, allThemes: string[]) => void;
export declare const disableAnimation: () => () => void;
export declare const getSystemTheme: (e?: MediaQueryList) => string;
