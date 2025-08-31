<script lang="ts">
	import SvelteTheme from '$lib/SvelteTheme.svelte';
	let { children, data } = $props();
</script>

<SvelteTheme forcedTheme={data?.forcedTheme}>
	{@render children()}
</SvelteTheme>
