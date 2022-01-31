import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { ConfigSchema } from './config/validation';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreResolver } from './core.resolver';
import { join } from 'path';
import { Request } from 'express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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
      playground: process.env.NODE_ENV === 'development',
      formatResponse: (res, ctx) => {
        const req = ctx.request;

        Logger.log(`${req.operationName} Request`, req.variables);
        Logger.log(`${req.operationName} Response`, res.data);
        return res;
      },
      context: ({ res }) => ({ res }),
      cors: (
        req: Request,
        callback: (error: Error | null, options: CorsOptions) => void
      ) => {
        const origin = req.headers['origin'];

        if (origin === process.env.CLIENT_URL) {
          callback(null, { origin: true, credentials: true });
        } else {
          callback(new Error('Not allowed by CORS'), { origin: false });
        }
      },
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
