import { z } from 'zod';
import { emailSchema } from './shared/emailSchema';

export const requestResetSchema = z.object({ email: emailSchema });
