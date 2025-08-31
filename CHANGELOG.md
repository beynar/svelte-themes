# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-08-31

### Removed

- `themeStore` (replaced by `useTheme()`).

### Changed

- Migrated to Svelte 5 runes ($state, $derived, $effect, $props()).

### Migration

- Replace `themeStore` usage with:
  `const theme = useTheme(); // theme.theme, theme.themes, theme.setTheme(...)`

### Example

```svelte
<script lang="ts">
  import { useTheme } from 'svelte-themes';
  const theme = useTheme();
</script>

<select bind:value={theme.theme}>
  {#each theme.themes as name (name)}
    <option value={name}>{name}</option>
  {/each}
</select>
```

### Fixed

- Numerous defects addressed, including validation edge cases and theme sync behavior.

### Security

- Added escaping utilities for inline scripts to mitigate XSS vectors in theme bootstrapping (see helpers: escapeForInlineScript, escapeJsString).

### Added

- ColorScheme map to set a custom color scheme based on theme.

### Thank you

@aholland for the initial Svelte 5 migration

## [1.0.2] - 2025-06-24

### Added

- Comprehensive runtime validation using custom store that catches invalid theme names from all update methods (bind:value, setTheme, direct store updates)
- Debug display in demo page showing complete theme store state with theme-aware styling

### Fixed

- Fixed duplicate "system" entry in themes array that was caused by incorrectly spreading and re-adding "system"
- Fixed systemTheme property not being updated when system preference changes - now properly reflects actual system preference ("light" or "dark") instead of staying as "system"
- Improved validation logic to skip validation during initialization when themes array is empty

## [1.0.1] - 2025-06-24

### Added

- Runtime validation in `setTheme()` function that throws an error when attempting to set an invalid theme name
- Clear error messages showing the currently loaded themes when validation fails

### Fixed

- Prevents silent failures when incorrect theme names (like "auto" instead of "system") are used
- Improves developer experience by catching theme name mismatches early

## [1.0.0] - 2024-XX-XX

### Added

- Initial release
- Perfect port of next-themes for SvelteKit
- Support for Svelte 5 runes syntax
- System theme detection with prefers-color-scheme
- Theme persistence with localStorage
- Cross-tab synchronization
- Prevention of flash of unstyled content (FOUC)
- Comprehensive TypeScript support
