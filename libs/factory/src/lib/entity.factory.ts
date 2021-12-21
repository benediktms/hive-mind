import { User } from '@prisma/client';
import { hash } from 'argon2';
import { Chance } from 'chance';
import { prismaMock } from './singelton';

export class EntityFactory {
  private chance = new Chance();
  public prisma = prismaMock;

  public async generateUser(opts?: Partial<User>): Promise<User> {
    return {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: this.chance.email(),
      firstName: this.chance.first(),
      lastName: this.chance.last(),
      ...opts,
      passwordHash: await hash(
        (opts && opts.passwordHash) || this.chance.word()
      ),
    };
  }
}
