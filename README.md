This library is a port of [next-theme](https://github.com/pacocoursey/next-themes/) for SvelteKit. All credit goes to [pacocoursey](https://github.com/pacocoursey) and all [next-themes contributors](https://github.com/pacocoursey/next-themes/graphs/contributors)

While usable, this library is still in its early phase, PR are welcome.

# svelte-themes ![svelte-themes minzip package size](https://img.shields.io/bundlephobia/minzip/svelte-themes) ![Version](https://img.shields.io/npm/v/svelte-themes.svg?colorB=green)

An abstraction for themes in your SvelteKit.js app.

- ✅ Perfect dark mode in 1 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ No flash on load
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ❓ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ Theme store

Check out the [Live Example](https://svelte-themes.vercel.app) to try it for yourself.

## Install

```bash
$ pnpm add svelte-themes
# or
$ npm install svelte-themes
# or
$ yarn add svelte-themes
```

## Using svelte-themes

In order to use svelte-themes you will need to add `SvelteTheme` inside your [`__layout component`](https://kit.svelte.dev/docs#layouts).

```tsx
// pages/__layout.svelte

<script>
	import SvelteTheme from 'svelte-themes/SvelteTheme.svelte';
</script>

<SvelteTheme />
<slot />
```

### Props

- `storageKey = 'theme'`: Key used to store theme setting in localStorage
- `defaultTheme = 'system'`: Default theme name (for v0.0.12 and lower the default was `light`). If `enableSystem` is false, the default theme is `light`
- `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
- `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
- `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
- `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes
- `themes = ['light', 'dark']`: List of theme names
- `attribute = 'data-theme'`: HTML attribute modified based on the active theme
  - accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.)
- `value`: Optional mapping of theme name to attribute value
  - value is an `object` where key is the theme name and value is the attribute value

## Reading and updating the theme

Svelte-themes exports

- a `theme` writable store as its default so you can access the theme props anywhere in you app
- `setTheme` function so you can easily switch the theme.

```tsx
<script>
import themeStore, { setTheme } from 'svelte-themes';
<script/>

<select bind:value={$themeStore.theme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system">System</option>
</select>

<button on:click={() => setTheme('dark')}> Dark mode </button>
```

### Theme store

- `theme`: Active theme name
- `forcedTheme`: Forced page theme or falsy. If `forcedTheme` is set, you should disable any theme switching UI
- `resolvedTheme`: If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
- `systemTheme`: If `enableSystem` is true, represents the System theme preference ("dark" or "light"), regardless what the active theme is
- `themes`: The list of themes passed to `ThemeProvider` (with "system" appended, if `enableSystem` is true)

For the rest of the documentation please refer to the [next-themes repo](https://github.com/pacocoursey/next-themes).
