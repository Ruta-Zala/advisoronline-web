import { NavigationItem } from '~/types/graphql';

export const categoriesMock = [
	{
		title: 'Topics',
		path: 'topics',
		items: [
			{ title: 'Financial Advisors', path: 'topics/financial-advisors' },
			{ title: 'Asset Managers', path: 'topics/asset-managers' },
			{ title: 'Products', path: 'topics/products' },
		],
	},
	{
		title: 'Private',
		path: 'private',
		items: [
			{ title: 'People', path: 'private/people' },
			{ title: 'Strategies', path: 'private/strategies' },
			{ title: 'Products', path: 'private/products' },
		],
	},
	{
		title: 'Professional',
		path: 'professional',
		items: [
			{ title: 'Partners', path: 'pro/partners' },
			{ title: 'Managers View', path: 'pro/managers-view' },
			{ title: 'Featured Funds', path: 'pro/featured-funds' },
		],
	},
	{
		title: 'ESG',
		path: 'esg',
		items: [
			{ title: 'Partners', path: 'esg/partners' },
			{ title: 'Strategies', path: 'esg/strategies' },
			{ title: 'Products', path: 'esg/products' },
		],
	},
	{
		title: 'Play',
		path: 'play',
	},
	{
		title: 'Open Events',
		path: 'open-events',
	},
] as NavigationItem[];
