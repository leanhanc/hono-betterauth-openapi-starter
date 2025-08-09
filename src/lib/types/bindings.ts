import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

export interface AppBindings {
	Variables: {
		logger: PinoLogger;
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}

export interface ProtectedRoutesBindings {
	Variables: {
		logger: PinoLogger;
		user: typeof auth.$Infer.Session.user;
		session: typeof auth.$Infer.Session.session;
	};
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;

export type ProtectedAppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	ProtectedRoutesBindings
>;

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export interface AppModule {
	routes: AppOpenAPI | OpenAPIHono<ProtectedRoutesBindings>;
}
