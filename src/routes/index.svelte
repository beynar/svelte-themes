<script>
	import themeStore, { setTheme } from 'svelte-themes';
	$: {
		console.log($themeStore);
	}
</script>

<div>
	<h1>Svelte-themes example</h1>
	<select bind:value={$themeStore.theme}
		><option value="dark">Dark</option><option value="light">Light</option><option value="system"
			>System</option
		></select
	>
	<button on:click={() => setTheme('dark')}> dark </button>
	<!-- <div>
		<a href="/dark">Forced Dark Page</a>
		<a href="/light">Forced Light Page</a>
	</div> -->
</div>

<style global>
	body {
		display: grid;
		place-content: center;
		height: 100vh;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
	body > div > div {
		display: grid;
		place-content: center;
	}
	select {
		height: 40px;
		font-size: 20px;
	}
	body > div > div > div {
		display: flex;

		justify-content: space-between;
	}
	a {
		color: inherit;
	}
</style>
