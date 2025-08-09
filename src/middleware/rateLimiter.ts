import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import * as HttpStatusCodes from 'stoker/http-status-codes';

/* Types */
import type { Context } from 'hono';
import type { AppBindings } from '../lib/types';

const rateLimits = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_CONFIG = { points: 10, duration: 1000 }; // 10 requests per second

export default function rateLimiter() {
	// eslint-disable-next-line consistent-return
	return async function rateLimiterMiddleware(
		c: Context<AppBindings>,
		next: () => Promise<void>,
	) {
		const ip = c.req.header('x-forwarded-for') ?? 'anonymous';
		const now = Date.now();
		const userRateLimit = rateLimits.get(ip);

		if (
			!userRateLimit ||
			now - userRateLimit.timestamp > RATE_LIMIT_CONFIG.duration
		) {
			rateLimits.set(ip, { count: 1, timestamp: now });
		} else if (userRateLimit.count >= RATE_LIMIT_CONFIG.points) {
			return c.json(
				{ error: HttpStatusPhrases.TOO_MANY_REQUESTS },
				HttpStatusCodes.TOO_MANY_REQUESTS,
			);
		} else {
			userRateLimit.count += 1;
		}

		await next();
	};
}
