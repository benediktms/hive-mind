import { z } from 'zod';

export const password = z.string().min(10).max(100);
