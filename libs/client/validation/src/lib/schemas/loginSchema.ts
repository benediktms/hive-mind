import { z } from 'zod';
import { emailSchema } from './shared/emailSchema';
import { passwordSchema } from './shared/passwordSchema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
