import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { AppBindings, ProtectedRoutesBindings } from './bindings';

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
