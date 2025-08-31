import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import noRedundantTemplateNesting from './eslint-rules/no-redundant-template-nesting.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	{
		files: ['src/**/*.{ts,js}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json'
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				localStorage: 'readonly',
				setTimeout: 'readonly',
				Window: 'readonly',
				MediaQueryList: 'readonly',
				MediaQueryListEvent: 'readonly',
				StorageEvent: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': ts,
			'@stylistic': stylistic,
			'custom': {
				rules: {
					'no-redundant-template-nesting': noRedundantTemplateNesting
				}
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-unused-vars': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'no-useless-concat': 'error',
			'prefer-template': 'error',
			'@stylistic/template-curly-spacing': ['error', 'never'],
			'custom/no-redundant-template-nesting': 'error'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelte.parser,
			parserOptions: {
				parser: tsParser
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				localStorage: 'readonly',
				setTimeout: 'readonly',
				Window: 'readonly',
				MediaQueryList: 'readonly',
				MediaQueryListEvent: 'readonly',
				StorageEvent: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': ts,
			'@stylistic': stylistic,
			'custom': {
				rules: {
					'no-redundant-template-nesting': noRedundantTemplateNesting
				}
			}
		},
		rules: {
			'svelte/no-at-html-tags': 'off', // Needed for ThemeScript inline script generation
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'no-useless-concat': 'error',
			'prefer-template': 'error',
			'@stylistic/template-curly-spacing': ['error', 'never'],
			'custom/no-redundant-template-nesting': 'error'
		}
	},
	{
		files: ['*.js', '*.config.js'],
		languageOptions: {
			sourceType: 'module'
		}
	},
	{
		ignores: [
			'dist/',
			'node_modules/',
			'.svelte-kit/',
			'build/',
			'package/',
			'tests/',
			'*.config.js',
			'eslint.config.js'
		]
	}
];