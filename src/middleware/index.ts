import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';

/* Types */
import type { OpenAPIHono } from '@hono/zod-openapi';
import type { AppBindings } from '../lib/types';

/* Middleware */
import pinoMiddleware from './pino';
import rateLimiter from './rateLimiter';
import sessionMiddleware from './session';

export default function injectMiddleware(app: OpenAPIHono<AppBindings>) {
	app.notFound(notFound);
	app.onError(onError);

	app
		.use(
			'*',
			cors({
				origin: process.env['CORS_ORIGIN'] ?? '*',
				allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
				exposeHeaders: ['Content-Length', 'Content-Type', 'Authorization'],
				maxAge: 600,
				credentials: true,
			}),
		)
		.use(secureHeaders())
		.use(sessionMiddleware())
		.use(rateLimiter())
		.use(pinoMiddleware())
		.use(prettyJSON())
		.use(serveEmojiFavicon('🩵'))
		.use(requestId());
}
