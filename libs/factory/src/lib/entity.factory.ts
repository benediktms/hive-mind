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
      email: 'test@example.com', //this.chance.email(),
      firstName: 'First', //this.chance.first(),
      lastName: 'Last', //this.chance.last(),
      ...opts,
      passwordHash: await hash(
        (opts && opts.passwordHash) || 'helloworld' //this.chance.word()
      ),
    };
  }
}
