import { DataService } from '@hive-mind/server-data';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const logger = app.get(Logger);

  const dataService = app.get(DataService);
  await dataService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');
  const CLIENT_URL = configService.get('CLIENT_URL');

  app.use(cookieParser());
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(port);

  if (env === 'development') {
    logger.log(
      `🚀 Application is running in ${env} mode on: http://localhost:${port}`
    );
    logger.log(
      `GraphQL playground running on http://localhost:${port}/graphql`
    );
  }
}

void bootstrap();
