<script>
	import themeStore from '$lib/index';
</script>

<div>
	<h1>Svelte-themes example</h1>

	<select bind:value={$themeStore.theme}
		><option value="dark">Dark</option><option value="light">Light</option><option value="system"
			>System</option
		></select
	>

	<p>
		<a href="/dark">Forced Dark Page</a>
		<a href="/light">Forced Light Page</a>
		<a href="/">Home page</a>
	</p>
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
	body > div > div > p {
		display: flex;

		justify-content: space-between;
	}
	button {
		margin-top: 10px;
	}
	a {
		color: inherit;
	}
</style>
