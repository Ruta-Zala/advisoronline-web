module.exports = {
	root: true,
	extends: ['@nuxt/eslint-config', 'plugin:storybook/recommended', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/no-multiple-template-root': 'off',
	},
	overrides: [
		{
			// Pages and layouts are required to have a single root element if transitions are enabled.
			files: ['**/pages/**/*.page.{js,ts,vue}', '**/layouts/**/*.{js,ts,vue}'],
			rules: { 'vue/no-multiple-template-root': 'error' },
		},
	],
};
