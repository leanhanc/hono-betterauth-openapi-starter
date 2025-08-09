/* App */
import app from './app';

export interface ServerExport {
	port: number;
	fetch: App['fetch'];
}

export default {
	port: process.env['PORT'] ?? 4000,
	fetch: app.fetch,
} as ServerExport;

export type App = typeof app;
