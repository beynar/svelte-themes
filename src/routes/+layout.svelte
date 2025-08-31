<script lang="ts">
	import SvelteTheme from '$lib/SvelteTheme.svelte';
	let { children } = $props();
</script>

<SvelteTheme forcedTheme={data?.forcedTheme}>
	{@render children()}
</SvelteTheme>
