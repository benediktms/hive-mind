import { z } from 'zod';

const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z.string().min(10).max(100);

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
