export default [
	{
		files: ['*.ts'],
		ignores: ['projects/**/*'],
		plugins: {
			'unused-imports': {},
			'simple-import-sort': {},
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
]
