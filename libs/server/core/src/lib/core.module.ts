import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        autoSchemaFile: join(
          process.cwd(),
          '/libs/server/core/src/schema.graphql'
        ),
        sortSchema: true,
        playground: true,
        formatResponse: (res, ctx) => {
          const req = ctx.request;

          Logger.log(`${req.operationName} Request`, req.variables);
          Logger.log(`${req.operationName} Response`, res.data);
          return res;
        },
        context: ({ res }) => ({ res }),
        cors: false,
        // {
        //   credentials: true,
        //   origin: configService.get('clientUrl'),
        // },
      }),
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
