import { z } from 'zod';
import { newPasswordSchema } from './shared/passwordSchema';

export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    passwordConfirmation: newPasswordSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
