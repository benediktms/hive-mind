import { z } from 'zod';

/**
 * Note that all env variables are initially considered strings
 */
export const ConfigSchema = z.object({
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().min(1),
  PROCFILE: z.string().default('/apps/api/Procfile'),
  JWT_SECRET: z.string().min(1),
  CLIENT_URL: z.string().url(),
  COOKIE_SECRET: z.string().min(1),
});
