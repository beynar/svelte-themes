interface Props {
    forcedTheme: string | undefined;
    storageKey: string;
    attribute: string;
    enableSystem: boolean;
    defaultTheme: string;
    value: {
        [themeName: string]: string;
    } | undefined;
    attrs: any;
}
declare const ThemeScript: import("svelte").Component<Props, {}, "">;
type ThemeScript = ReturnType<typeof ThemeScript>;
export default ThemeScript;
