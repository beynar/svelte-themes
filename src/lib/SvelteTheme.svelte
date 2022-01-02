<script lang="ts">
	import { browser } from '$app/env';
	import { colorSchemes, MEDIA } from './constants';
	import { disableAnimation, getSystemTheme, getTheme } from './helpers';
	import themeStore, { setTheme } from './index';
	const updateThemeStore = (update) => themeStore.update((store) => ({ ...store, ...update }));
	import defaultThemeConfig from '$lib/defaultThemeConfig';

	const {
		attribute = defaultThemeConfig.attribute,
		defaultTheme = defaultThemeConfig.defaultTheme,
		themes = defaultThemeConfig.themes,
		value,
		enableColorScheme = defaultThemeConfig.enableColorScheme,
		disableTransitionOnChange = defaultThemeConfig.disableTransitionOnChange,
		forcedTheme = defaultThemeConfig.forcedTheme,
		storageKey = defaultThemeConfig.storageKey,
		enableSystem = defaultThemeConfig.enableSystem
	} = themeConfig || defaultThemeConfig;

	const initialTheme = getTheme(storageKey, defaultTheme);

	themeStore.set({
		theme: initialTheme,
		forcedTheme,
		resolvedTheme: initialTheme === 'system' ? getTheme(storageKey) : initialTheme,
		themes: enableSystem ? [...themes, 'system'] : themes,
		systemTheme: (enableSystem ? getTheme(storageKey) : undefined) as 'light' | 'dark' | undefined
	});

	$: theme = $themeStore.theme;
	$: resolvedTheme = $themeStore.resolvedTheme;

	const attrs = !value ? themes : Object.values(value);

	const handleMediaQuery = (e?) => {
		const systemTheme = getSystemTheme(e);
		updateThemeStore({ resolvedTheme: systemTheme });
		if (theme === 'system' && !forcedTheme) changeTheme(systemTheme, false);
	};

	const changeTheme = (theme, updateStorage = true, updateDOM = true) => {
		let name = value?.[theme] || theme;

		const enable = disableTransitionOnChange && updateDOM ? disableAnimation() : null;

		if (updateStorage) {
			try {
				localStorage.setItem(storageKey, theme);
			} catch (e) {
				// Unsupported
			}
		}

		if (theme === 'system' && enableSystem) {
			const resolved = getSystemTheme();
			name = value?.[resolved] || resolved;
		}

		if (updateDOM && browser) {
			const d = document.documentElement;

			if (attribute === 'class') {
				d.classList.remove(...(attrs as string[]));
				d.classList.add(name);
			} else {
				d.setAttribute(attribute, name);
			}
			enable?.();
		}
	};

	const mediaHandler = (...args: any) => handleMediaQuery(...args);

	// localStorage event handling
	const storageHandler = (e: StorageEvent) => {
		if (e.key !== storageKey) {
			return;
		}
		// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
		setTheme(e.newValue || defaultTheme);
	};

	const onWindow = (window) => {
		const media = window.matchMedia(MEDIA);
		media.addListener(mediaHandler);
		mediaHandler(media);
		window.addEventListener('storage', storageHandler);
		return {
			destroy() {
				window.removeEventListener('storage', storageHandler);
				media.removeListener(mediaHandler);
			}
		};
	};

	// color-scheme handling
	$: if (enableColorScheme && browser) {
		let colorScheme =
			// If theme is forced to light or dark, use that
			forcedTheme && colorSchemes.includes(forcedTheme)
				? forcedTheme
				: // If regular theme is light or dark
				theme && colorSchemes.includes(theme)
				? theme
				: // If theme is system, use the resolved version
				theme === 'system'
				? resolvedTheme || null
				: null;
		// color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
		// if color-scheme is null, this will remove the property
		document.documentElement.style.setProperty('color-scheme', colorScheme);
	}

	$: {
		if (forcedTheme) {
			changeTheme($themeStore.theme, true, false);
		} else {
			changeTheme($themeStore.theme);
		}
	}
</script>

<svelte:window use:onWindow />
