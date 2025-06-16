import { MEDIA, colorSchemes } from './constants';

const ANIMATION_DELAY_MS = 1;

export const getTheme = (key: string, fallback?: string): string | undefined => {
	if (typeof window === 'undefined') return undefined;
	let theme;
	try {
		theme = localStorage.getItem(key) || undefined;
	} catch (e) {
		// Unsupported
	}
	return theme || fallback;
};

export const setThemeStorage = (key: string, value: string): boolean => {
	try {
		localStorage.setItem(key, value);
		return true;
	} catch (e) {
		return false;
	}
};

export const resolveTheme = (theme: string, value?: {[key: string]: string}): string => {
	if (theme === 'system') {
		const systemTheme = getSystemTheme();
		return value?.[systemTheme] || systemTheme;
	}
	return value?.[theme] || theme;
};

export const getColorScheme = (
	theme: string | undefined, 
	resolvedTheme: string | undefined, 
	forcedTheme?: string
): string | null => {
	if (forcedTheme && colorSchemes.includes(forcedTheme)) {
		return forcedTheme;
	}
	if (theme && colorSchemes.includes(theme)) {
		return theme;
	}
	if (theme === 'system') {
		return resolvedTheme || null;
	}
	return null;
};

export const applyThemeToDOM = (
	element: HTMLElement, 
	attribute: string, 
	themeName: string, 
	allThemes: string[]
): void => {
	if (attribute === 'class') {
		element.classList.remove(...allThemes);
		element.classList.add(themeName);
	} else {
		element.setAttribute(attribute, themeName);
	}
};

export const disableAnimation = () => {
	const css = document.createElement('style');
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, ANIMATION_DELAY_MS);
	};
};

export const getSystemTheme = (e?: MediaQueryList): string => {
	if (!e) {
		e = window.matchMedia(MEDIA);
	}

	const isDark = e.matches;
	const systemTheme = isDark ? 'dark' : 'light';
	return systemTheme;
};
