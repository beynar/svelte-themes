This library is a port of [next-themes](https://github.com/pacocoursey/next-themes/) for Svelte. All credit goes to [pacocoursey](https://github.com/pacocoursey) and all [next-themes contributors](https://github.com/pacocoursey/next-themes/graphs/contributors).

# svelte-themes ![svelte-themes minzip package size](https://img.shields.io/bundlephobia/minzip/svelte-themes) ![Version](https://img.shields.io/npm/v/svelte-themes.svg?colorB=green)

An abstraction for themes in your Svelte app - works with any Svelte environment (SvelteKit, Vite, Webpack, etc.)

- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ No FOUC (Flash of Unstyled Content)
- ✅ Sync theme across tabs and windows
- ✅ Disable transition flash when changing themes
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ Theme context
- ✅ **Svelte 5 ready** with modern runes syntax
- ✅ **Universal** - works with any Svelte setup
- ✅ **Zero framework lock-in** - no SvelteKit dependency

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

Add `SvelteTheme` to your app's root component. In SvelteKit, this would be your [`+layout.svelte`](https://kit.svelte.dev/docs/routing#layout).

```svelte
<!-- src/routes/+layout.svelte (SvelteKit) -->
<!-- or src/App.svelte (Vite + Svelte) -->

<script lang="ts">
	import { SvelteTheme } from 'svelte-themes';
	let { children } = $props();
</script>

<SvelteTheme>
	{@render children()}
</SvelteTheme>
```

### Props

- `storageKey = 'theme'`: Key used to store theme setting in localStorage
- `defaultTheme = 'system'`: Default theme name. If `enableSystem` is false, the default theme is `light`
- `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
- `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
- `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
- `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes
- `themes = ['light', 'dark']`: List of theme names
- `attribute = 'data-theme'`: HTML attribute modified based on the active theme
  - accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.)
- `value`: Optional mapping of theme name to attribute value
  - Example: `{ dark: 'dark-theme', light: 'light-theme' }`
- `colorScheme`: Optional mapping of theme name to color scheme value
  - Example: `{ 'custom-dark': 'dark', 'custom-light': 'light' }`

## Reading and updating the theme

Use the `useTheme()` hook to access and change the active theme.

```svelte
<script lang="ts">
  import { useTheme } from 'svelte-themes';
  const theme = useTheme();
</script>

<select bind:value={theme.theme}>
  {#each theme.themes as name (name)}
    <option value={name}>{name}</option>
  {/each}
</select>

<button onclick={() => (theme.theme = 'dark')}>Dark mode</button>
<button onclick={() => (theme.theme = 'light')}>Light mode</button>
```

### Theme state

- `theme`: Active theme name
- `resolvedTheme`: If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
- `systemTheme`: If `enableSystem` is true, represents the System theme preference ("dark" or "light"), regardless what the active theme is
- `themes`: The list of themes passed to `SvelteTheme` (with "system" appended, if `enableSystem` is true)

## Examples

### Basic dark/light mode

```svelte
<script>
  import { SvelteTheme } from 'svelte-themes';
    let { children } = $props();
</script>

<SvelteTheme>
	{@render children()}
</SvelteTheme>
```

### Custom theme names with value mapping

```svelte
<script>
  import { SvelteTheme } from 'svelte-themes';
    let { children } = $props()
</script>

<SvelteTheme
  themes={['corporate', 'neon', 'vintage']}
  value={{
    corporate: 'theme-corporate',
    neon: 'theme-neon-bright',
    vintage: 'theme-retro'
  }}
  attribute="class"
>
	{@render children()}
</SvelteTheme>
```

### With color scheme mapping

```svelte
<script>
  import { SvelteTheme } from 'svelte-themes';
  let { children } = $props()
</script>

<SvelteTheme
  themes={['light', 'dark', 'midnight', 'dawn']}
  colorScheme={{
    midnight: 'dark',  // Maps to CSS color-scheme: dark
    dawn: 'light'      // Maps to CSS color-scheme: light
  }}
>
  {@render children()}
</SvelteTheme>
```
