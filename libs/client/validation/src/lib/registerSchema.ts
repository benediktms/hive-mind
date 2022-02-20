import { z } from 'zod';
import { email } from './shared/email';
import { password } from './shared/password';

const name = z
  .string()
  .min(2)
  .max(100)
  .transform((str) => str.trim());

export const RegisterSchema = z
  .object({
    email,
    firstName: name,
    lastName: name,
    password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
