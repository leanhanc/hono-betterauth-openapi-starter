/* Types */
import type { Context } from 'hono';
import type { AppBindings } from '../lib/types';

export default function checkAuth() {
	return async (c: Context<AppBindings>, next: () => Promise<void>) => {
		const user = c.get('user');

		if (!user) {
			return c.json({ error: 'Unauthorized' }, 401);
		}

		await next();
	};
}
