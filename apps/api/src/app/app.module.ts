import { CoreModule } from '@grp-org/core';
import { DataModule } from '@grp-org/data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
