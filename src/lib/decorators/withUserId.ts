import type { Context } from 'hono';
import type { ProtectedRoutesBindings } from '../types';

export function withUserId<T>(
	handler: (c: Context<ProtectedRoutesBindings>, userId: string) => T,
) {
	return (c: Context<ProtectedRoutesBindings>): T => {
		const user = c.get('user');
		return handler(c, user.id);
	};
}
