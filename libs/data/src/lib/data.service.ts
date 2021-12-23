import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DataService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    await this.$connect();
  }

  // public async onModuleDestroy() {
  //   if (this.configService.get('environment') === 'test') {
  //     this.$queryRaw`DROP DATABASE tests`;
  //   }

  //   await this.$disconnect();
  // }

  /**
   * This is required because Prisma handles shutdown signals differently
   * from nest (which is why OnModuleDestroy is not implemented). Another
   * potential solution that could allow OnModuleDestroy to be used
   * would be what was mentioned here:
   * https://github.com/prisma/prisma/issues/2917#issuecomment-900693387
   */
  public async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
