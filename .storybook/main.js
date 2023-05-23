module.exports = {
	stories: [
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
		'../icons/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/vue3-vite',
		options: {
			builder: {
				viteConfigPath: '.storybook/vite.config.ts',
			},
		},
	},
	docs: {
		autodocs: 'tag',
	},
};
