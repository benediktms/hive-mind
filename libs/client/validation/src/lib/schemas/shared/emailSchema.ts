import { z } from 'zod';

export const emailSchema = z
  .string()
  .email()
  .transform(str => str.toLowerCase().trim());
