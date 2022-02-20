import { z } from 'zod';

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());
