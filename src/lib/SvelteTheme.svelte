<script lang="ts">
	// Browser detection - works in any Svelte environment
	const browser = typeof window !== 'undefined';
	import { MEDIA } from './constants';
	import { disableAnimation, getSystemTheme, getTheme, setThemeStorage, resolveTheme, getColorScheme, applyThemeToDOM } from './helpers';
	import themeStore, { setTheme } from './index';

	import ThemeScript from './ThemeScript.svelte';

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

	let {
		forcedTheme = undefined,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = 'theme',
		themes = enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
		defaultTheme = enableSystem ? 'system' : 'light',
		attribute = 'data-theme',
		value = undefined
	}: Props = $props();

	const initialTheme = getTheme(storageKey, defaultTheme);

	themeStore.set({
		theme: initialTheme,
		forcedTheme,
		resolvedTheme: initialTheme === 'system' ? getTheme(storageKey) : initialTheme,
		themes: themes,
		systemTheme: (enableSystem ? getTheme(storageKey) : undefined) as 'light' | 'dark' | undefined
	});

	// Modern Svelte 5 derived values
	let theme = $derived($themeStore.theme);
	let resolvedTheme = $derived($themeStore.resolvedTheme);

	const attrs = !value ? themes : Object.values(value);

	const handleMediaQuery = (e?: MediaQueryList | MediaQueryListEvent) => {
		const systemTheme = getSystemTheme(e as MediaQueryList);
		$themeStore.resolvedTheme = systemTheme;
		$themeStore.systemTheme = systemTheme as 'dark' | 'light';

		// Only apply system theme if no forcedTheme is present (matches next-themes)
		if (theme === 'system' && enableSystem && !forcedTheme) {
			changeTheme(systemTheme, false);
		}
	};

	const changeTheme = (theme: string, updateStorage = true, updateDOM = true) => {
		const enable = disableTransitionOnChange && updateDOM ? disableAnimation() : null;

		if (updateStorage) {
			setThemeStorage(storageKey, theme);
		}

		const name = resolveTheme(theme, value);

		if (updateDOM && browser) {
			applyThemeToDOM(document.documentElement, attribute, name, attrs as string[]);
			enable?.();
		}
	};


	const storageHandler = (e: StorageEvent) => {
		if (e.key !== storageKey) return;
		// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
		setTheme(e.newValue || defaultTheme);
	};

	const onWindow = (window: Window) => {
		// Always listen to System preference
		const media = window.matchMedia(MEDIA);
		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handleMediaQuery);
		handleMediaQuery(media);
		// localStorage event handling
		window.addEventListener('storage', storageHandler);
		return {
			destroy() {
				window.removeEventListener('storage', storageHandler);
				media.removeListener(handleMediaQuery);
			}
		};
	};

	// color-scheme handling with modern effect
	$effect(() => {
		if (enableColorScheme && browser) {
			const colorScheme = getColorScheme(theme, resolvedTheme, forcedTheme);
			// color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
			// if color-scheme is null, this will remove the property
			document.documentElement.style.setProperty('color-scheme', colorScheme);
		}
	});

	// Theme application with modern effect
	$effect(() => {
		// Apply forcedTheme if present, otherwise use the normal theme
		// This matches next-themes: applyTheme(forcedTheme ?? theme)
		const themeToApply = forcedTheme || theme;
		if (themeToApply) {
			const updateStorage = !forcedTheme; // Don't save forced themes to localStorage
			changeTheme(themeToApply, updateStorage, true);
		}
	});
</script>

<ThemeScript {forcedTheme} {storageKey} {attribute} {enableSystem} {defaultTheme} {value} {attrs} />

<svelte:window use:onWindow />
