import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { ConfigSchema } from './config/validation';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreResolver } from './core.resolver';
import { join } from 'path';
import { loggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (configuration) => ConfigSchema.parse(configuration),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), '/libs/core/src/schema.graphql'),
      sortSchema: true,
      playground: true,
      // formatResponse: (res, ctx) => {
      //   const logger = new Logger();

      //   logger.log(ctx.request.query, 'GraphQL');
      //   logger.log(res.data, 'Response');

      //   return res;
      // },
      buildSchemaOptions: { fieldMiddleware: [loggerMiddleware] },
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
