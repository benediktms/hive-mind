import { z } from 'zod';

export const passwordSchema = z.string().min(1);
export const newPasswordSchema = z.string().min(10).max(100);
