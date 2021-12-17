import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { ConfigSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (configuration) => ConfigSchema.parse(configuration),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
