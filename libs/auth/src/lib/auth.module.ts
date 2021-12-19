import { DataModule } from '@grp-org/data';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import AuthService from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';

@Module({
  controllers: [],
  providers: [AuthResolver, AuthService, JwtStrategy, GraphQLAuthGuard],
  exports: [],
  imports: [
    DataModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
      }),
    }),
  ],
})
export class AuthModule {}
