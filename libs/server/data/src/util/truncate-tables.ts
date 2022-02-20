import { Logger } from '@nestjs/common';
import { DataService } from '..';

export async function truncateTables(dataService: DataService) {
  const tablenames = await dataService.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await dataService.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      } catch (error) {
        Logger.error('Error truncating tables for tests', error);
      }
    }
  }
}
