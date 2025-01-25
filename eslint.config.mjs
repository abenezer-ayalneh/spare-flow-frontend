// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import angularEslint from 'angular-eslint'

export default tsEslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			tsEslint.configs.recommended,
			tsEslint.configs.stylistic,
			angularEslint.configs.tsRecommended,
			// tsEslint.configs.strict,
		],
		processor: angularEslint.processInlineTemplates,
		rules: {
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
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angularEslint.configs.templateRecommended, ...angularEslint.configs.templateAccessibility],
		rules: {},
	},
)
