# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `svelte-themes` - a port of next-themes for SvelteKit that provides theme management functionality. The project has been migrated from SvelteKit 1.x to SvelteKit 2.x with Svelte 5, and uses modern build tooling.

## Key Commands

### Development
```bash
pnpm dev          # Start dev server on port 9090
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Code Quality
```bash
pnpm check        # Type check with svelte-check
pnpm check:watch  # Type check in watch mode
```

### Analysis
```bash
pnpm analyze      # Generate bundle analysis (requires build first)
```

## Architecture

### Core Components
- **SvelteTheme.svelte**: Main theme provider component that manages theme state, localStorage persistence, system preference detection, and DOM updates
- **ThemeScript.svelte**: Generates inline script for preventing flash of unstyled content (FOUC) during theme initialization
- **index.ts**: Exports the theme store and `setTheme` function for consuming components

### Theme Management Flow
1. `SvelteTheme` component initializes theme from localStorage or system preference
2. `ThemeScript` generates inline script to apply theme before page render (prevents FOUC)
3. Theme changes update both Svelte store and DOM attributes/classes
4. System preference changes are automatically detected via `matchMedia`
5. Cross-tab synchronization via localStorage events

### Key Integration Points
- Place `<SvelteTheme />` in your root layout (`+layout.svelte`)
- Import `themeStore` and `setTheme` from `svelte-themes` in consuming components
- Themes are applied via HTML attributes (`data-theme` by default) or CSS classes

### Migration Status
The project is currently migrated from SvelteKit 1.x to 2.x architecture:
- File structure updated to new SvelteKit conventions (`+page.svelte`, `+layout.svelte`)
- Build system migrated from old `svelte-kit` commands to Vite
- Dependencies updated to Svelte 5 and modern tooling
- Documentation may reference old patterns (e.g., `__layout.svelte` instead of `+layout.svelte`)

## Development Notes

- Uses pnpm as package manager
- TypeScript configuration includes strict type checking
- The library exports both a default theme store and named `setTheme` function
- Theme persistence uses localStorage with fallback handling for unsupported environments
- System theme detection uses `prefers-color-scheme` media query