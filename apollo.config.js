const dotenv = require('dotenv');

dotenv.config();

/**
 * This file configuration is only for Visual Studio Code at the moment
 * https://apollo.vuejs.org/guide/installation.html#visual-studio-code
 */
module.exports = {
	client: {
		service: {
			name: 'AdvisorOnline',
			url: `${process.env.NUXT_STRAPI_ORIGIN}/graphql`,
		},
		includes: ['./pages/**/*.graphql'],
	},
};
