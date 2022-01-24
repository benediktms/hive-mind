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
        redact: ['password', 'context[*].password'],
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'dd-mm-yyyy HH:mm:ss:ms',
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
