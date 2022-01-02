This library is a port of [next-theme](https://github.com/pacocoursey/next-themes/) for SvelteKit. All credit goes to [pacocoursey](https://github.com/pacocoursey) and all [next-themes contributors](https://github.com/pacocoursey/next-themes/graphs/contributors)

While usable, this library is still in its early phase, PR are welcome.

# svelte-themes ![svelte-themes minzip package size](https://img.shields.io/bundlephobia/minzip/svelte-themes) ![Version](https://img.shields.io/npm/v/svelte-themes.svg?colorB=green)

An abstraction for themes in your SvelteKit.js app.

- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ No flash on load (both SSR and SSG)
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

In order to use svelte-themes you will need:

- to define a global `themeConfig` variable inside your `svelte.config.js` under [`vite.define.themeConfig`](https://vitejs.dev/config/#define),
- to tweek [SvelteKit `handle hook`](https://kit.svelte.dev/docs#hooks-handle) in order to avoid the flashing theme sync,
- Add SvelteTheme to your [`__layout component`](https://kit.svelte.dev/docs#layouts).

### The config object

```js
// svelte.config.js
const config = {
kit: {
...
		vite: {
            ...
			define: {
                ...
				themeConfig: {
					forcedTheme: undefined,
					// /** Forced theme name for the current page */
					disableTransitionOnChange: false,
					// /** Whether to switch between dark and light themes based on prefers-color-scheme */
					enableSystem: true,
					// /** Disable all CSS transitions when switching themes */
					enableColorScheme: true,
					// /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
					storageKey: 'theme',
					// /** Key used to store theme setting in localStorage */
					themes: ['light', 'dark'],
					// /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
					defaultTheme: 'light',
					// /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
					attribute: 'data-theme'
					// /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
					// value: undefined
				}
			}
		}
	}
};
...
```

### The hook

You can simply export an handle function as the handleThemeScript exported from svelte-themes/themeHook.

```ts
// lib/hooks.ts
import { handleThemeScript } from 'svelte-themes/themeHook';

export const handle = handleThemeScript;
```

or use the `injectThemeScript` on the response object if you already have a custom logic defined in you handle hook.

```ts
// lib/hooks.ts
import { injectThemeScript } from 'svelte-themes/themeHook';

export async function handle({ request, resolve }) {
	const response = await resolve(request);
	response = myCustomLogic(response);

	return injectThemeScript(response);
}
```

### The layout

Adding dark mode support takes 2 lines of code:

```tsx
// pages/__layout.svelte

<script>
	import SvelteTheme from 'svelte-themes/SvelteTheme.svelte';
</script>

<SvelteTheme />
<slot />

```

## Reading and updating the theme

Svelte-themes exports a `themeStore` as its default so you can access the theme props anywhere in you app.

Svelte-themes also export a `setTheme` function so you can easily switch the theme.

```tsx
import themeStore, { setTheme } from 'svelte-themes';
...
```

For the rest of the documentation please refer to the [next-themes repo](https://github.com/pacocoursey/next-themes).
