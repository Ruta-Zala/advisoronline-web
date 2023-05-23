import { Maybe } from '~/types/graphql';
import { RegisterFieldsQuery } from '~/pages/auth/components/details-register-boxes.query';

export function createOptionsForStatic(
	first: string,
	items: RegisterFieldsQuery['assetsSizes'],
) {
	return [
		{ text: first, value: '' },
		...(items ?? []).filter(Boolean).map((e) => ({ text: e, value: e })),
	];
}

type CreateOptionsForDynamicItems =
	| NonNullable<RegisterFieldsQuery['banks']>['data']
	| NonNullable<RegisterFieldsQuery['companyNetworks']>['data'];

export function createOptionsForDynamic(
	first: string,
	items?: Maybe<CreateOptionsForDynamicItems>,
) {
	return [
		{ text: first, value: '' },
		...(items ?? []).map((e) => ({
			text: e.attributes?.name as string,
			value: e.id as string,
		})),
	];
}
