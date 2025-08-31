<script>
	import { useTheme } from '$lib/theme.state.svelte';

	const theme = useTheme();
</script>

<div>
	<h1>svelte-themes Example</h1>
	<select bind:value={theme.theme}>
		{#each theme.themes as themeName}
			<option value={themeName}>{themeName}</option>
		{/each}
	</select>

	<br />
	<br />

	<div>
		<a href="/dark">Forced Dark Page</a> • <a href="/light">Forced Light Page</a>
	</div>
	<div>
		<button
			onclick={() => {
				// clear storage
				window.localStorage.removeItem('theme');
			}}>Reset</button
		>
	</div>

	<br />
	<br />

	<!-- Debug display -->
	<div
		style:transition="all 0.3s ease-in-out"
		style:background="color-mix(in srgb, var(--bg) 90%, var(--fg) 10%)"
		style:color="var(--fg)"
		style="background: color-mix(in srgb, var(--bg) 90%, var(--fg) 10%); color: var(--fg); padding: 10px; margin: 10px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap; border: 1px solid color-mix(in srgb, var(--bg) 70%, var(--fg) 30%); text-align: left;"
	>
		<strong>Debug - Theme Store:</strong><br />
		{JSON.stringify(
			{
				current: theme.theme,
				themes: theme.themes,
				systemTheme: theme.systemTheme,
				resolvedTheme: theme.resolvedTheme
			},

			null,
			2
		)}
	</div>

	<br />
	<table style="margin: 0 auto; width: auto; table-layout: auto; color: #666;">
		<tbody>
			<tr>
				<td colspan="2" style="text-align: left; white-space: normal; max-width: 400px;"
					>This is the demo page for <b>svelte-themes</b>. Svelte-themes is a Svelte port of the
					React library <b>next-themes</b>.</td
				>
			</tr>

			<tr>
				<td><br /></td>
			</tr>
			<tr>
				<td style="text-align: left;">Package:</td>
				<td style="text-align: left;">svelte-themes</td>
			</tr>
			<tr>
				<td style="text-align: left;">Framework:</td>
				<td style="text-align: left;">Svelte</td>
			</tr>
			<tr>
				<td style="text-align: left;">NPM:</td>
				<td style="text-align: left;"
					><a
						href="https://www.npmjs.com/package/svelte-themes"
						target="_blank"
						rel="noopener noreferrer">https://www.npmjs.com/package/svelte-themes</a
					></td
				>
			</tr>
			<tr>
				<td style="text-align: left;">GitHub:</td>
				<td style="text-align: left;"
					><a
						href="https://github.com/pacocoursey/svelte-themes"
						target="_blank"
						rel="noopener noreferrer">https://github.com/pacocoursey/svelte-themes</a
					></td
				>
			</tr>
			<tr>
				<td style="text-align: left;">Demo:</td>
				<td style="text-align: left;"
					><a href="https://svelte-themes.vercel.app/" target="_blank" rel="noopener noreferrer"
						>https://svelte-themes.vercel.app/</a
					> (this page)</td
				>
			</tr>
		</tbody>
	</table>
	<br />
</div>
