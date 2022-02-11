import { DataModule } from '@hive-mind/server-data';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { CourierModule } from '@hive-mind/server/courier';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GraphQLAuthGuard,
    TokenService,
    UserService,
  ],
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
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
    CourierModule,
  ],
})
export class AuthModule {}
