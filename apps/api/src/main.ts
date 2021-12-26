import { DataService } from '@grp-org/server-data';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const dataService = app.get(DataService);
  await dataService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const env = configService.get('environment');

  await app.listen(port);

  Logger.log(
    `🚀 Application is running in ${env} mode on: http://localhost:${port}`
  );
  Logger.log(`GraphQL playground running on http://localhost:${port}/graphql`);
}

void bootstrap();
