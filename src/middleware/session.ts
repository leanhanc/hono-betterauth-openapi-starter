/* Utils */
import { auth } from '@api/lib/utils/auth';

/* Types */
import type { Context } from 'hono';
import type { AppBindings } from '../lib/types';

export default function sessionMiddleware() {
	return async function sessionMiddlewareHandler(
		c: Context<AppBindings>,
		next: () => Promise<void>,
	) {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});

		if (!session) {
			c.set('user', null);
			c.set('session', null);
		} else {
			c.set('user', session.user);
			c.set('session', session.session);
		}

		await next();
	};
}
