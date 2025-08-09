import { OpenAPIHono } from '@hono/zod-openapi';
import { defaultHook } from 'stoker/openapi';

/* Types */
import type { AppBindings } from './lib/types/bindings';

/* Utils */
import injectMiddleware from './middleware';
import configureDocs from './lib/utils/docs';
import { registerModules } from './lib/utils/routers';

/* Modules */
import modules from './modules';

const app = new OpenAPIHono<AppBindings>({ strict: false, defaultHook });

// Health Check
app.get('/health', (c) => c.json({ status: 'OK' }));

injectMiddleware(app);
configureDocs(app);
registerModules(app, modules);

export default app;
