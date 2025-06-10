<script>
	import SvelteTheme from '$lib/SvelteTheme.svelte';
	
	export let data;
	$: forcedTheme = data?.forcedTheme;
</script>

<SvelteTheme {forcedTheme} />
<slot />
