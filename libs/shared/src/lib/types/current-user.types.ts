import { User } from '@prisma/client';

export type CurrentUser =
  | Omit<
      User,
      'id' | 'passwordHash' | 'createdAt' | 'updatedAt' | 'refreshTokenVersion'
    >
  | undefined;
