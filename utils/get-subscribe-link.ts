import { User } from './types';

export function getSubscribeLink(userInfo: User | null) {
	return userInfo ? '/user' : '/auth/register?subscribe=true';
}
