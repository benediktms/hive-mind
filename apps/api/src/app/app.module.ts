import { AuthModule } from '@hive-mind/server-auth';
import { CoreModule } from '@hive-mind/server-core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
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
