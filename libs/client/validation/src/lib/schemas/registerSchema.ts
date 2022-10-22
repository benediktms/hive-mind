import { z } from 'zod';
import { emailSchema } from './shared/emailSchema';
import { newPasswordSchema } from './shared/passwordSchema';

const name = z
  .string()
  .min(2)
  .max(100)
  .transform(str => str.trim());

export const registerSchema = z
  .object({
    email: emailSchema,
    firstName: name,
    lastName: name,
    password: newPasswordSchema,
    passwordConfirmation: newPasswordSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
