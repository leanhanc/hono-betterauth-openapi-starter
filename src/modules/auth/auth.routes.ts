/* Utils */
import { createPublicRouter } from '../../lib/utils/routers';
import { auth } from '../../lib/utils/auth';

const router = createPublicRouter();

router.get('/auth/*', (c) => {
	return auth.handler(c.req.raw);
});

router.post('/auth/*', async (c) => {
	try {
		const result = await auth.handler(c.req.raw);

		return result;
	} catch (error) {
		return c.json(
			{
				error: 'Auth handler failed',
				details: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			},
			500,
		);
	}
});

export default router;
