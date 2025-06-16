<script>
	import themeStore from '$lib/index';
</script>

<div>
	<h1>svelte-themes Example</h1>
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

	<br />
	<br />
	<table style="margin: 0 auto; width: auto; table-layout: auto;">
		<tbody>
		<tr>
			<td colspan="2" style="text-align: left; white-space: normal; max-width: 400px;">This is the demo page for <b>svelte-themes</b>. Svelte-themes is a Svelte port of the React library <b>next-themes</b>.</td>
		</tr>
		<tr>
			<td><br/></td>
		</tr>
		<tr>
			<td style="text-align: left;">Package</td>
			<td style="text-align: left;">next-themes</td>
		</tr>
		<tr>
			<td style="text-align: left;">Framework</td>
			<td style="text-align: left;">React</td>
		</tr>
		<tr>
			<td style="text-align: left;">NPM</td>
			<td style="text-align: left;"><a href="https://www.npmjs.com/package/next-themes" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/next-themes</a></td>
		</tr>
		<tr>
			<td style="text-align: left;">GitHub</td>
			<td style="text-align: left;"><a href="https://github.com/pacocoursey/next-themes" target="_blank" rel="noopener noreferrer">https://github.com/pacocoursey/next-themes</a></td>
		</tr>
		<tr>
			<td style="text-align: left;">Demo</td>
			<td style="text-align: left;"><a href="https://next-themes-example.vercel.app/" target="_blank" rel="noopener noreferrer">https://next-themes-example.vercel.app/</a></td>
		</tr>
		<tr>
			<td><br/></td>
		</tr>
		<tr>
			<td style="text-align: left;">Package</td>
			<td style="text-align: left;">svelte-themes</td>
		</tr>
		<tr>
			<td style="text-align: left;">Framework</td>
			<td style="text-align: left;">Svelte</td>
		</tr>
		<tr>
			<td style="text-align: left;">NPM</td>
			<td style="text-align: left;"><a href="https://www.npmjs.com/package/svelte-themes" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/svelte-themes</a></td>
		</tr>
		<tr>
			<td style="text-align: left;">GitHub</td>
			<td style="text-align: left;"><a href="https://github.com/pacocoursey/svelte-themes" target="_blank" rel="noopener noreferrer">https://github.com/pacocoursey/svelte-themes</a></td>
		</tr>
		<tr>
			<td style="text-align: left;">Demo</td>
			<td style="text-align: left;">This page</td>
		</tr>
		</tbody>
	</table>
	<br/>
	<table style="margin: 0 auto;">
		<tbody>
		<tr>
			<td style="text-align: center;"><em>This demo should perfectly match the <a href="https://next-themes-example.vercel.app/" target="_blank" rel="noopener noreferrer">next-themes demo</a>.</em></td>
		</tr>
		</tbody>
	</table>

</div>
