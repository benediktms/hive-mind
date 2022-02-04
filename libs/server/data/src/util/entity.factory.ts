import { User } from '@prisma/client';
import { hash } from 'argon2';
import { internet, name } from 'faker';

export class EntityFactory {
  public async generateUser(opts?: Partial<User>): Promise<Omit<User, 'id'>> {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),
      email: internet.email(),
      firstName: name.firstName(),
      lastName: name.lastName(),
      ...opts,
      passwordHash: await hash(
        (opts && opts.passwordHash) || internet.password()
      ),
      refreshTokenVersion: 0,
      authToken: null,
      hasConfirmedEmail: opts?.hasConfirmedEmail ?? false,
    };
  }
}
