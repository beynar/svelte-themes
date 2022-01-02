import defaultThemeConfig from '$lib/defaultThemeConfig';
import { MEDIA } from '$lib/constants';

export const injectThemeScript = (response) => {
	if (!response.body) return response;
	const {
		attribute = defaultThemeConfig.attribute,
		defaultTheme = defaultThemeConfig.defaultTheme,
		themes = defaultThemeConfig.themes,
		value,
		forcedTheme = defaultThemeConfig.forcedTheme,
		storageKey = defaultThemeConfig.storageKey,
		enableSystem = defaultThemeConfig.enableSystem
	} = themeConfig || defaultThemeConfig;

	const attrs = !value ? themes : Object.values(value);
	const defaultSystem = defaultTheme === 'system';
	const optimization =
		attribute === 'class'
			? `var d=document.documentElement.classList;${`d.remove(${attrs
					.map((t: string) => `'${t}'`)
					.join(',')})`};`
			: `var d=document.documentElement;`;
	const updateDOM = (name: string, literal?: boolean) => {
		name = value?.[name] || name;
		const val = literal ? name : `'${name}'`;

		if (attribute === 'class') {
			return `d.add(${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
		}

		return `d.setAttribute('${attribute}', ${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
	};

	const script = `<script>${
		forcedTheme
			? `!function(){${optimization}${updateDOM(forcedTheme)}}()`
			: enableSystem
			? `!function(){try {${optimization}var e=localStorage.getItem('${storageKey}');${
					!defaultSystem ? updateDOM(defaultTheme) + ';' : ''
			  }if("system"===e||(!e&&${defaultSystem})){var t="${MEDIA}",m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
					'dark'
			  )}}else{${updateDOM('light')}}}else if(e){ ${
					value ? `var x=${JSON.stringify(value)};` : ''
			  }${updateDOM(value ? 'x[e]' : 'e', true)}}}catch(e){}}()`
			: `!function(){try{${optimization}var e=localStorage.getItem("${storageKey}");if(e){${
					value ? `var x=${JSON.stringify(value)};` : ''
			  }${updateDOM(value ? 'x[e]' : 'e', true)}}else{${updateDOM(defaultTheme)};}}catch(t){}}();`
	}</script>\n`;

	const headIndex = response.body.indexOf('<head>\n');
	if (headIndex === -1) return response;
	response.body =
		response.body.slice(0, headIndex + 7) + script + response.body.slice(headIndex + 7);
	return response;
};

export const handleThemeScript = async ({ request, resolve }) => {
	const response = await resolve(request);
	if (request.pathname && request.pathname.startWith('/api')) return response;
	return injectThemeScript(response);
};
