<script lang="ts">
	import { MEDIA } from './constants';

	export let forcedTheme: string;
	export let storageKey: string;
	export let attribute: string;
	export let enableSystem: boolean;
	export let defaultTheme: string;
	export let value: { [themeName: string]: string };
	export let attrs: any;

	// These are minified via Terser and then updated by hand, don't recommend

	const updateDOM = (name: string, literal?: boolean) => {
		name = value?.[name] || name;
		const val = literal ? name : `'${name}'`;

		if (attribute === 'class') {
			return `d.add(${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
		}

		return `d.setAttribute('${attribute}', ${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
	};

	$: defaultSystem = defaultTheme === 'system';
	// Code-golfing the amount of characters in the script
	$: optimization =
		attribute === 'class'
			? `var d=document.documentElement.classList;${`d.remove(${attrs
					.map((t: string) => `'${t}'`)
					.join(',')})`};`
			: `var d=document.documentElement;`;

	// Encapsulate script tag into string to not mess with the compiler
	$: themeScript = `<${'script'}>${
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
	}</${'script'}>`;
</script>

<svelte:head>
	{@html themeScript}
</svelte:head>
