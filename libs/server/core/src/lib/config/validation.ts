import { z } from 'zod';

/**
 * Note that all env variables are initially considered strings
 */
export const ConfigSchema = z.object({
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().min(1),
  PROCFILE: z.string().default('/apps/api/Procfile'),
  CLIENT_URL: z.string().url(),
  BASE_DOMAIN: z.string(),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  ANON_KEY: z.string().min(1),
  SERVICE_KEY: z.string().min(1),
  CONFIRM_ACCOUNT_NOTIFICATION_ID: z.string().min(1),
  COURIER_BRAND_ID: z.string().min(1),
  COURIER_AUTH_TOKEN: z.string().min(1),
});
