import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'storybook-static/**',
			'testplane/reports/**',
			'.testplane/**',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx}'],
		plugins: {
			'@stylistic': stylistic,
			'react-hooks': reactHooks,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'@stylistic/indent': ['error', 'tab', { SwitchCase: 1 }],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/jsx-quotes': ['error', 'prefer-double'],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
		},
	},
	{
		files: ['**/*.{test,a11y.test}.{ts,tsx}', '**/*.testplane.tsx'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
	{
		files: ['**/*.stories.{ts,tsx}'],
		rules: {
			'react-hooks/rules-of-hooks': 'off',
		},
	},
	{
		files: ['.testplane.conf.ts', 'testplane-tools/**/*.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
	{
		files: ['src/types/testplane-globals.d.ts'],
		rules: {
			'@typescript-eslint/no-namespace': 'off',
		},
	},
);
