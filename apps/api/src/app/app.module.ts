import { AuthModule } from '@grp-org/auth';
import { CoreModule } from '@grp-org/core';
import { DataModule } from '@grp-org/data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, DataModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
