import { OpenAPIHono } from '@hono/zod-openapi';
import { defaultHook } from 'stoker/openapi';

/* Types */
import type { AppBindings } from './lib/types/bindings';

const app = new OpenAPIHono<AppBindings>({ strict: false, defaultHook });

/* Health Check */
app.get('/health', (c) => c.json({ status: 'OK' }));

export default app;
