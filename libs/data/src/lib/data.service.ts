import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DataService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  public async onModuleInit() {
    await this.$connect();
  }

  /**
   * This is required because Prisma handles shutdown signals differently
   * from nest (which is why OnModuleDestroy is not implemented). Another
   * potential solution that could allow OnModuleDestroy to be used
   * would be what was mentioned here:
   * https://github.com/prisma/prisma/issues/2917#issuecomment-900693387
   */
  public async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => await app.close());
  }
}
