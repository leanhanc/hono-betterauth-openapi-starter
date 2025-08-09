import { Scalar } from '@scalar/hono-api-reference';
import packageJSON from '../../../package.json' with { type: 'json' };

/* Types */
import type { AppOpenAPI } from '../types';

/* Utils */
import { auth } from './auth';

export default function configureOpenAPI(app: AppOpenAPI) {
	app.doc('/api-reference', {
		openapi: '3.0.0',
		info: {
			version: packageJSON.version,
			title: 'Hono Better Auth OpenAPI Starter',
		},
	});

	app.get(
		'/api-docs',
		Scalar({
			url: '/api-reference',
			theme: 'kepler',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'js',
				clientKey: 'fetch',
			},
		}),
	);

	// Better-auth specific endpoints
	app.get('/betterauth-reference', async (c) => {
		try {
			const authSchema = await auth.api.generateOpenAPISchema();

			const baseUrl = new URL(c.req.url).origin;
			const modifiedSchema = {
				...authSchema,
				servers: [
					{
						url: `${baseUrl}/api/auth`,
						description: 'Authentication API',
					},
				],
			};

			return c.json(modifiedSchema);
		} catch {
			return c.json(
				{ error: 'Failed to generate better-auth OpenAPI schema' },
				500,
			);
		}
	});

	app.get(
		'/betterauth-docs',
		Scalar({
			url: '/betterauth-reference',
			theme: 'kepler',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'js',
				clientKey: 'fetch',
			},
		}),
	);
}
