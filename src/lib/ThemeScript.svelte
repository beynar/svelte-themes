<script lang="ts">
	import { writable } from 'svelte/store';
	import { MEDIA } from './constants';

	export let forcedTheme: string;
	export let storageKey: string;
	export let attribute: string;
	export let enableSystem: boolean;
	export let defaultTheme: string;
	export let value: { [themeName: string]: string };
	export let attrs: any;

	const updateDOM = (name: string, literal?: boolean) => {
		name = value?.[name] || name;
		const val = literal ? name : `'${name}'`;

		if (attribute === 'class') {
			return `d.add(${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
		}

		return `d.setAttribute('${attribute}', ${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
	};

	$: defaultSystem = defaultTheme === 'system';
	$: optimization =
		attribute === 'class'
			? `var d=document.documentElement.classList;${`d.remove(${attrs
					.map((t: string) => `'${t}'`)
					.join(',')})`};`
			: `var d=document.documentElement;`;

	$: scriptTag = `${
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
	}`;

	const scriptStore = writable(scriptTag);
	$: {
		scriptStore.set(scriptTag);
	}
</script>

<svelte:head>
	<!--
	Aweful trick to inject the script at the right time 😂
	We would rather do something like the following but the @html doesn't work with script tag.
	<script>
	{@html scriptTag}
	</script>
	Also, we can't use an action to set innerHtml because it runs too late and causes a flash
-->
	<script bind:innerHTML={$scriptStore} contenteditable="true"></script>
</svelte:head>
