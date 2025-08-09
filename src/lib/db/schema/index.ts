import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const schema = {};

const DATABASE_URL =
	process.env['DATABASE_URL'] ??
	'postgres://postgres:postgres@localhost:5432/postgres';

const client = postgres(DATABASE_URL);
const db = drizzle({ client, schema });

export type DB = typeof db;
export default db;
