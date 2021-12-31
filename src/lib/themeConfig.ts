export default {
	/** List of all available theme names */
	forcedTheme: undefined,
	// /** Forced theme name for the current page */
	disableTransitionOnChange: false,
	// /** Whether to switch between dark and light themes based on prefers-color-scheme */
	enableSystem: true,
	// /** Disable all CSS transitions when switching themes */
	enableColorScheme: true,
	// /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
	storageKey: 'theme',
	// /** Key used to store theme setting in localStorage */
	themes: ['light', 'dark', 'system'],
	// /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
	defaultTheme: 'light',
	// /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
	attribute: 'data-theme',
	// /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
	value: undefined
};
