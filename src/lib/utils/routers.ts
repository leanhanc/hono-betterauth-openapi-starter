import { OpenAPIHono } from '@hono/zod-openapi';

/* Types */
import type {
	AppBindings,
	AppModule,
	AppOpenAPI,
	ProtectedRoutesBindings,
} from '../types';

/* Utils */
import { defaultHook } from 'stoker/openapi';

export function createPublicRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	});
}

export function createProtectedRouter() {
	return new OpenAPIHono<ProtectedRoutesBindings>({
		strict: false,
		defaultHook,
	});
}

export function registerModules(app: AppOpenAPI, modules: AppModule[]) {
	modules.forEach((module) => {
		app.route('/api', module.routes as OpenAPIHono<AppBindings>);
	});
}
