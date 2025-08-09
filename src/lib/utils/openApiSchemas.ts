import { z } from '@hono/zod-openapi';

export const successSchema = z.object({
	success: z.boolean().default(true),
	message: z.string(),
});

export const errorSchema = z.object({
	success: z.boolean().default(false),
	message: z.string(),
});

export const notFoundSchema = z.object({
	success: z.boolean().default(false),
	message: z.string().default('Resource not found'),
});

export const validationErrorSchema = z.object({
	success: z.boolean().default(false),
	message: z.string().default('Validation error'),
	errors: z
		.array(
			z.object({
				field: z.string(),
				message: z.string(),
			}),
		)
		.optional(),
});
