import { AuthModule } from '@grp-org/server-auth';
import { CoreModule } from '@grp-org/server-core';
import { DataModule } from '@grp-org/server-data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CoreModule,
    DataModule,
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        redact: ['password', 'input.password'],
        prettyPrint:
          process.env.NODE_ENV !== 'production'
            ? { colorize: true, singleLine: true, translateTime: true }
            : false,
        autoLogging: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
