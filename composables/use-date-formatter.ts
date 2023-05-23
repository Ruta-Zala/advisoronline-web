import { Maybe } from '~/types/graphql';
import { useAcceptLanguage } from './use-accept-language';

export function useDateFormatter(options?: Intl.DateTimeFormatOptions) {
	const languages = useAcceptLanguage();
	const dateFormatter = new Intl.DateTimeFormat(languages, options);

	return (date?: Date | Maybe<string>) => {
		return dateFormatter.format(date ? new Date(date) : undefined);
	};
}
