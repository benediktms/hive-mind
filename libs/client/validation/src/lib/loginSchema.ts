import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
  password: z.string(),
});
