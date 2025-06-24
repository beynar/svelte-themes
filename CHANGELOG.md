# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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