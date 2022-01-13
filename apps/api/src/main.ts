import { DataService } from '@grp-org/server-data';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataService = app.get(DataService);
  await dataService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const env = configService.get('environment');
  const clientUrl = configService.get('clientUrl');
  const cookieSecret = configService.get('cookieSecret');

  app.use(cookieParser(cookieSecret));
  app.enableCors({ origin: clientUrl, credentials: true });

  await app.listen(port);

  if (env === 'development') {
    Logger.log(
      `🚀 Application is running in ${env} mode on: http://localhost:${port}`
    );
    Logger.log(
      `GraphQL playground running on http://localhost:${port}/graphql`
    );
  }
}

void bootstrap();
