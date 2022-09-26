import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { ConfigSchema } from './config/validation';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreResolver } from './core.resolver';
import { join } from 'path';
import { Request } from 'express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: configuration => ConfigSchema.parse(configuration),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '/libs/server/core/src/schema.graphql'
      ),
      sortSchema: true,
      playground: true,
      introspection: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatResponse: (res: any, ctx: any) => {
        const req = ctx.request;

        Logger.log(`${req.operationName} Request`, req.variables);
        Logger.log(`${req.operationName} Response`, res.data);
        return res;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: ({ res }: any) => ({ res }),
      cors: (
        req: Request,
        callback: (error: Error | null, options: CorsOptions) => void
      ) => {
        const origin = req.headers['origin'];
        const isPermitted =
          origin === process.env.CLIENT_URL ||
          process.env.NODE_ENV === 'development';

        if (isPermitted) {
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
