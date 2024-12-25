// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	// Custom rules
	{
		files: ['*.ts'],
		ignores: ['projects/**/*'],
		plugins: {
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
		},
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:@angular-eslint/recommended',
			'plugin:@angular-eslint/template/process-inline-templates',
			'plugin:prettier/recommended',
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'unused-imports/no-unused-imports': 'error',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
	{
		files: ['*.html'],
		excludedFiles: ['*inline-template-*.component.html'],
		extends: ['plugin:prettier/recommended', 'plugin:@angular-eslint/template/recommended', 'plugin:@angular-eslint/template/accessibility'],
		rules: {
			'prettier/prettier': [
				'error',
				{
					parser: 'angular',
				},
			],
		},
	},
)
