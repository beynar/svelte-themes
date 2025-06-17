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
declare const ThemeScript: $$__sveltets_2_IsomorphicComponent<{
    forcedTheme: string | undefined;
    storageKey: string;
    attribute: string;
    enableSystem: boolean;
    defaultTheme: string;
    value: {
        [themeName: string]: string;
    } | undefined;
    attrs: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ThemeScript = InstanceType<typeof ThemeScript>;
export default ThemeScript;
