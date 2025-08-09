import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';

export default [
	// Base ignores
	{
		ignores: ['build/', 'dist/', 'node_modules/'],
	},

	// Base recommended rules
	eslint.configs.recommended,
	prettierConfig,

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Bun: 'readonly',
			},
		},
		plugins: {
			import: pluginImport,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'no-console': 'error',
			'consistent-return': 'warn',
			'no-await-in-loop': 'warn',
			'no-duplicate-imports': 'error',
		},
	},

	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,

	{
		files: ['**/*.js'],
		...tseslint.configs.disableTypeChecked,
	},
];
