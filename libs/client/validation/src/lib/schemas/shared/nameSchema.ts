import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(2)
  .max(100)
  .transform(str => str.trim());
