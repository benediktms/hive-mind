import { z } from 'zod';
import { email } from './shared/email';

export const RequestResetSchema = z.object({ email });
