import dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: `${process.env.NUXT_STRAPI_ORIGIN}/graphql`,
	documents: 'pages/**/*.graphql',
	generates: {
		'types/graphql.ts': {
			plugins: ['typescript'],
			config: {
				strictScalars: false,
				defaultScalarType: 'unknown',
				scalars: {
					Date: 'string',
					DateTime: 'string',
				},
			},
		},
		'pages/': {
			preset: 'near-operation-file',
			presetConfig: {
				extension: '.ts',
				// For some reason a tilda is stripped away
				// But still works because nuxt has ~~ alias
				baseTypesPath: '~~/types/graphql',
			},
			plugins: ['typescript-operations', 'typed-document-node'],
		},
	},
};

export default config;
