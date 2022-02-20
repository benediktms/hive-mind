import { z } from 'zod';
import { password } from './shared/password';

export const ResetPasswordSchema = z
  .object({
    password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
