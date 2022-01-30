import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { ConfigSchema } from './config/validation';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreResolver } from './core.resolver';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (configuration) => ConfigSchema.parse(configuration),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        '/libs/server/core/src/schema.graphql'
      ),
      sortSchema: true,
      formatResponse: (res, ctx) => {
        const req = ctx.request;

        Logger.log(`${req.operationName} Request`, req.variables);
        Logger.log(`${req.operationName} Response`, res.data);
        return res;
      },
      context: ({ res }) => ({ res }),
      cors: false,
      // cors: {
      //   origin: process.env.CLIENT_URL,
      //   credentials: true,
      // },
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
