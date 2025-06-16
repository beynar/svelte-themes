<script>
	import themeStore from '$lib/index';
</script>

<div>
	<h1>next-themes Example</h1>
	<select bind:value={$themeStore.theme}>
		<option value="system">System</option>
		<option value="dark">Dark</option>
		<option value="light">Light</option>
	</select>

	<br />
	<br />

	<div>
		<a href="/dark">Forced Dark Page</a> • <a href="/light">Forced Light Page</a>
	</div>
</div>
