import { AuthModule } from '@grp-org/server-auth';
import { CoreModule } from '@grp-org/server-core';
import { DataModule } from '@grp-org/server-data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, DataModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
