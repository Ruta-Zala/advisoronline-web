import { useI18n } from 'vue-i18n';
import { isValidEntity } from './entity';
import { groupBy } from './group-by';
import { CardSubscriptionProps } from '~/components/card-subscription/card-subscription.component.vue';
import { SubscriptionsQuery } from '../pages/graphql/queries/subscriptions.query';

type Entities = NonNullable<
	SubscriptionsQuery['subscriptionSubscriptions']
>['data'];

export function useSubscriptions(entities: Entities) {
	const { t } = useI18n();

	return computed(() => {
		const subscriptions = entities
			.filter(isValidEntity)
			.filter((e) => e.attributes.customId)
			.map((e) => ({
				...e.attributes,
				id: e.id,
				groupId: getGroupFromCustomId(e.attributes.customId as string),
			}));

		const groups = groupBy(subscriptions, 'groupId');
		const entries = Object.entries(groups).slice(0, 3);

		type ExtendedProps = CardSubscriptionProps & { key: string };
		return entries.map<ExtendedProps>(([groupId, subscriptions]) => ({
			key: groupId,
			name: t(boxTitlesKeyMock[groupId] ?? 'Advisor Online'),
			consumerChoice: boxConsumerChoiceMock[groupId] ?? false,
			options: subscriptions
				.sort((s1, s2) => s1.durationMonths - s2.durationMonths)
				.map((s) => ({
					id: s.customId as string,
					description: s.description ?? '',
					price: s.price,
					text: t('shared.months-number', { count: s.durationMonths }),
					months: s.durationMonths,
					disabled: false,
				})),
			contents: (boxContentsKeyMock[groupId] ?? []).map((k) => t(k)),
		}));
	});
}

function getGroupFromCustomId(id: string) {
	const [last, ...rest] = id.split('_').reverse();
	if (!last || rest.length === 0) return id;
	const isNumber = !Number.isNaN(Number.parseInt(last));
	return isNumber ? rest.reverse().join('_') : id;
}

const boxTitlesKeyMock: Record<string, string> = {
	ID_ADVISOR: 'subscription.advisor-magazine',
	ID_AP: 'subscription.advisor-private',
	ID_ADVISOR_AP: 'subscription.advisor-ap',
};

const boxConsumerChoiceMock: Record<string, boolean> = {
	ID_ADVISOR: false,
	ID_AP: false,
	ID_ADVISOR_AP: true,
};

const boxContentsKeyMock: Record<string, string[]> = {
	ID_ADVISOR: ['shared.annual-releases', 'subscription.digital-access'],
	ID_AP: ['shared.annual-releases', 'subscription.private-releases'],
	ID_ADVISOR_AP: [
		'shared.issues-news-magazine',
		'shared.advisor-private-releases',
		'shared.annual-releases',
	],
};
