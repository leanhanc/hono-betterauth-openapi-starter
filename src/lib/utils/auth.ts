import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { jwt, openAPI } from 'better-auth/plugins';

import db from '../db/schema';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	// advanced: {
	// 	database: {
	// 		useNumberId: true,
	// 		generateId: false,
	// 	},
	// },
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),

	plugins: [
		jwt({
			jwt: {
				expirationTime: '15m',
			},
		}),
		openAPI({
			path: '/betterauth-docs',
			disableDefaultReference: false,
		}),
	],
});

export interface AuthType {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
}
