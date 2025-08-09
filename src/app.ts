import { OpenAPIHono } from '@hono/zod-openapi';
import { defaultHook } from 'stoker/openapi';

/* Types */
import type { AppBindings } from './lib/types/bindings';

/* Utils */
import injectMiddleware from './middleware';
import configureOpenAPI from './lib/utils/openapi';

const app = new OpenAPIHono<AppBindings>({ strict: false, defaultHook });

// Health Check
app.get('/health', (c) => c.json({ status: 'OK' }));

// Middleware
injectMiddleware(app);
configureOpenAPI(app);

export default app;
