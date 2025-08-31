<script lang="ts" generics="const T extends readonly string[]">
	import { MEDIA, colorSchemes } from './constants';
	import { type SvelteThemeProps } from '.';
	import { Theme } from './theme.state.svelte';
	import { escapeForInlineScript, escapeJsString } from './helpers';

	let {
		forcedTheme = undefined,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = 'theme',
		themes,
		defaultTheme = enableSystem ? 'system' : 'light',
		attribute = 'data-theme',
		value = undefined,
		colorScheme,
		children
	}: SvelteThemeProps<T> = $props();

	// Validate defaultTheme is in themes array
	const validatedDefaultTheme = (() => {
		const defaultThemes = ['light', 'dark'];
		const currentThemes = (themes && themes.length > 0 ? themes : defaultThemes) as string[];
		const finalThemes =
			enableSystem && !currentThemes.includes('system')
				? currentThemes.concat('system')
				: currentThemes;

		// If defaultTheme is not in the themes array, fall back to first theme
		return finalThemes.includes(defaultTheme) ? defaultTheme : finalThemes[0];
	})();

	const theme = new Theme({
		get forcedTheme() {
			return forcedTheme;
		},
		get themes() {
			const defaultThemes = ['light', 'dark'];
			const currentThemes = (themes && themes.length > 0 ? themes : defaultThemes) as string[];
			if (enableSystem && !currentThemes.includes('system')) {
				return currentThemes.concat('system');
			}
			return currentThemes;
		},
		get enableSystem() {
			return enableSystem;
		},

		get enableColorScheme() {
			return enableColorScheme;
		},
		get colorScheme() {
			return colorScheme;
		},

		get defaultTheme() {
			return validatedDefaultTheme;
		},
		get attribute() {
			return attribute;
		},
		get value() {
			return value;
		},
		get storageKey() {
			return storageKey;
		},
		get disableTransitionOnChange() {
			return disableTransitionOnChange;
		}
	});

	const attrs = !value ? themes || [] : (Object.values(value || {}) as string[]);
	// Encapsulate script tag into string so as not to mess with the compiler
	let themeScript = `<script>
		function svelteTheme(){		
		var d=document.documentElement;
		var x=${escapeForInlineScript(value || {})};
		var y=${escapeForInlineScript(colorScheme || {})};
		var validThemes=${escapeForInlineScript(theme.themes)};		
		var localStorageTheme; try { localStorageTheme = localStorage.getItem('${escapeJsString(storageKey)}'); } catch(e) { localStorageTheme = null; }
		var systemTheme = ${enableSystem ? `window.matchMedia('${MEDIA}').matches ? 'dark' : 'light'` : "'normal'"};
		var isValidTheme = validThemes.indexOf(localStorageTheme) !== -1;	
		var isSystemThemeButDisabled = localStorageTheme === 'system' && ${!enableSystem};
		var currentTheme = isValidTheme ? localStorageTheme : '${escapeJsString(validatedDefaultTheme)}';
		if (isSystemThemeButDisabled) {
			currentTheme = '${escapeJsString(validatedDefaultTheme)}';
			try { localStorage.setItem('${escapeJsString(storageKey)}', currentTheme); } catch(e) {}
		}		
		var isSystemTheme = ${enableSystem ? "currentTheme === 'system'" : 'false'};
		var resolvedTheme = ${forcedTheme ? `'${escapeJsString(forcedTheme)}'` : `isSystemTheme ? systemTheme : currentTheme`};				
		var colorSchemeMode = y[resolvedTheme] || (resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'normal');
		var val = x[resolvedTheme] || resolvedTheme;
		${enableColorScheme ? `d.style.setProperty('color-scheme', colorSchemeMode);` : ''}
		${attribute === 'class' ? `d.classList.remove(${attrs.map((t) => `'${escapeJsString(t)}'`).join(',')})` : ''};
		${attribute === 'class' ? `d.classList.add(val);` : `d.setAttribute('${escapeJsString(attribute)}', val);`};
		};svelteTheme();
		</${'script'}>`;
</script>

<svelte:head>
	{@html themeScript}
</svelte:head>
{@render children?.(theme)}
