import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '../.env' });

if (!process.env['DATABASE_URL']) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	dialect: 'postgresql', // or 'mysql' or 'sqlite'
	schema: './src/lib/db/schema',
	out: './src/lib/db/migrations',
	dbCredentials: {
		url: process.env['DATABASE_URL'],
	},
});
