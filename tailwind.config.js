const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindBootstrapGridPreset = require('./packages/tailwind-bootstrap-grid-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./assets/**/*.{vue,js,ts,jsx,tsx}',
		'./components/**/*.{vue,js,ts,jsx,tsx}',
		'./composables/**/*.{vue,js,ts,jsx,tsx}',
		'./constants/**/*.{vue,js,ts,jsx,tsx}',
		'./icons/**/*.{vue,js,ts,jsx,tsx}',
		'./layouts/**/*.{vue,js,ts,jsx,tsx}',
		'./layouts-extended/**/*.{vue,js,ts,jsx,tsx}',
		'./pages/**/*.{vue,js,ts,jsx,tsx}',
		'./pages-extended/**/*.{vue,js,ts,jsx,tsx}',
		'./plugins/**/*.{vue,js,ts,jsx,tsx}',
		'./public/**/*.{vue,js,ts,jsx,tsx}',
		'./utils/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			'transparent': 'transparent',
			'dark-100': '#202020',
			'dark-200': '#131313',
			'dark-300': '#43413E',
			'dark-400': '#252129',
			'grey-1': '#F9F9FF',
			'grey-100': '#B1BDD6',
			'grey-200': '#F7F8FA',
			'grey-500': '#6B7280',
			'white-100': '#FFFFFF',
			'red-100': '#AD100C',
			'red-200': '#980400',
			'red-300': '#FDF8F8',
			'blue-100': '#0064D4',
			'green-2': '#27AE60',
		},
		screens: {
			sm: '576px',
			md: '768px',
			lg: '1200px',
			xl: '1600px',
		},
		extend: {
			fontFamily: {
				sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
				serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
			},
			spacing: {
				128: '32rem',
			},
			dropShadow: {
				subscription: [
					'12px 24px 43px rgba(0, 0, 0, 0.25) 5px 5px 0px #E4E4E4',
				],
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
	presets: [
		tailwindBootstrapGridPreset({
			gridGutterWidth: '1.5rem',
			gridGutters: {
				sm: '1rem',
				md: '1.5rem',
				lg: '2rem',
				xl: '2.5rem',
			},
			containerMaxWidths: {
				sm: 'none',
				md: 'none',
				// TODO: change to 1200px when dealing with outside container ad
				lg: '1366px',
				xl: '1366px',
			},
		}),
	],
	corePlugins: {
		container: false,
	},
};
