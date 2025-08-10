import type { PinoLogger } from 'hono-pino';

/* Utils */
import { auth } from '../../lib/utils/auth';

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
