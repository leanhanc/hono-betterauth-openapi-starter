import pino from 'pino';
import pretty from 'pino-pretty';
import { pinoLogger as pinoForHono } from 'hono-pino';

export default function pinoMiddleware() {
	return pinoForHono({
		pino: pino(
			{
				level: process.env['LOG_LEVEL'] as pino.LevelWithSilent,
			},
			process.env.NODE_ENV === 'production' ? undefined : pretty(),
		),
	});
}
