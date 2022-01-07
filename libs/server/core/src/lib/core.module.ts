import { Module } from '@nestjs/common';
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
      playground: true,
      // formatResponse: (res, _ctx) => {
      //   /**
      //    * NOTE: Logging the request here can expose user passwords and
      //    * should NEVER be done without implementing a way to redact
      //    * credentials
      //    */
      //   Logger.log(res.data, 'GQL Response');
      //   return res;
      // },
      context: ({ res }) => ({ res }),
      // introspection: true,
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
