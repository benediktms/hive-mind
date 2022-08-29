import { PrismaModule } from '@hive-mind/server-prisma';
import { Module } from '@nestjs/common';
import { CollectiveResolver } from './collective.resolver';
import { CollectiveService } from './collective.service';

@Module({
  imports: [PrismaModule],
  providers: [CollectiveService, CollectiveResolver],
  exports: [CollectiveService],
})
export class CollectiveModule {}
