import { Scalar } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from '../types';

import packageJSON from '../../../package.json' with { type: 'json' };

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
}
