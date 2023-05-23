const plugin = require('tailwindcss/plugin');
const tailwindBootstrapGrid = require('tailwind-bootstrap-grid');

/**
 * This plugin will extend `tailwind-bootstrap-grid` by adding
 * - specific container paddings based on screen size
 * - classes for canceling the container padding
 */
const tailwindBootstrapGridExtended = plugin.withOptions((options) => {
	return (pluginOptions) => {
		const { addComponents, config } = pluginOptions;
		const screens = config('theme.screens');
		const screenKeys = Object.keys(screens);
		const { gridGutterWidth = '1.5rem', gridGutters = {} } = options;

		addComponents({
			'.container-cancel': {
				'margin-inline': `calc(${gridGutterWidth} / 2 * -1)`,
			},
		});

		addComponents(
			screenKeys
				.filter((name) => gridGutters[name])
				.map((name) => ({
					[`@screen ${name}`]: {
						'.container': {
							'--bs-gutter-x': gridGutters[name],
						},
						'.container-fluid': {
							'--bs-gutter-x': gridGutters[name],
						},
						'.container-cancel': {
							'margin-inline': `-${gridGutters[name]}`,
						},
					},
				})),
		);

		addComponents({
			'.container-cancel-none': {
				'margin-inline': 0,
			},
		});
	};
});

module.exports = (options) => ({
	plugins: [
		tailwindBootstrapGrid(options),
		tailwindBootstrapGridExtended(options),
	],
});
