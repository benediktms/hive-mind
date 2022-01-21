import { DataModule } from '@grp-org/server-data';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtStrategy, GraphQLAuthGuard],
  exports: [],
  imports: [
    DataModule,
    PassportModule.register({
      session: false,
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('accessTokenSeret'),
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
})
export class AuthModule {}
