import { z } from 'zod';

export const passwordSchema = z.string().min(1);

export const newPasswordSchema = z.string().min(10).max(100);

export const passwordConfirmationSchema = z
  .object({
    password: newPasswordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });
