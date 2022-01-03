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

For the rest of the documentation please refer to the [next-themes repo](https://github.com/pacocoursey/next-themes).
