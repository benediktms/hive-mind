import { DataModule } from '@grp-org/data';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { AuthController } from './auth.controller';
import { LogoutResolver } from './logout.resolver';

@Module({
  controllers: [AuthController],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GraphQLAuthGuard,
    LogoutResolver,
  ],
  exports: [],
  imports: [
    DataModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
})
export class AuthModule {}
