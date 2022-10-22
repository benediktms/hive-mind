import { z } from 'zod';
import { emailSchema } from './shared/emailSchema';
import { nameSchema } from './shared/nameSchema';
import { newPasswordSchema } from './shared/passwordSchema';

export const registerSchema = z
  .object({
    email: emailSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    password: newPasswordSchema,
    passwordConfirmation: newPasswordSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
