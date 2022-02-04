import { User } from '@prisma/client';

export type CurrentUser = Partial<User> | undefined;
