import { PrismaService } from '@hive-mind/server-prisma';
import {
  AccessTokenPayload,
  TokenExpiration,
  RefreshTokenPayload,
  Cookies,
  RefreshToken,
  AccessToken,
} from '@hive-mind/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import dayjs from 'dayjs';
import { CookieOptions } from 'express';
import { Response } from 'express';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  private signAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('accessTokenSecret'),
      expiresIn: TokenExpiration.Access,
    });
  }

  private signRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: TokenExpiration.Refresh,
    });
  }

  private isProd = this.configService.get('NODE_ENV') === 'production';

  private defaultCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: this.isProd,
    sameSite: this.isProd ? 'strict' : 'lax',
    domain: this.configService.get('BASE_DOMAIN') as string,
    path: '/',
  };

  public setTokens(res: Response, accessToken: string, refreshToken?: string) {
    const accessTokenCookieOptions: CookieOptions = {
      ...this.defaultCookieOptions,
      maxAge: TokenExpiration.Access * 1000,
    };

    const refreshTokenCookieOptions: CookieOptions = {
      ...this.defaultCookieOptions,
      maxAge: TokenExpiration.Refresh * 1000,
    };

    res.cookie(Cookies.AccessToken, accessToken, accessTokenCookieOptions);

    if (refreshToken) {
      res.cookie(Cookies.RefreshToken, refreshToken, refreshTokenCookieOptions);
    }
  }

  public refreshTokens(current: RefreshToken, version: number) {
    if (version !== current.version) throw new Error('Token revoked');

    const accessPayload: AccessTokenPayload = { userId: current.userId };
    const accessToken = this.signAccessToken(accessPayload);

    let refreshPayload: RefreshTokenPayload | undefined;

    const expiration = dayjs(current.exp);
    const now = dayjs();
    const secondsUntilExpiration = now.diff(expiration, 'seconds');

    if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
      refreshPayload = { userId: current.userId, version };
    }

    const refreshToken =
      refreshPayload && this.signRefreshToken(refreshPayload);

    return { accessToken, refreshToken };
  }

  public verifyAccessToken(accessToken: string) {
    return this.jwtService.verify(
      accessToken,
      this.configService.get('accessTokenSecret')
    ) as AccessToken;
  }

  public verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verify(
      refreshToken,
      this.configService.get('REFRESH_TOKEN_SECRET')
    ) as RefreshToken;
  }

  public clearTokens(res: Response) {
    res.cookie(Cookies.AccessToken, '', {
      ...this.defaultCookieOptions,
      maxAge: 0,
    });

    res.cookie(Cookies.RefreshToken, '', {
      ...this.defaultCookieOptions,
      maxAge: 0,
    });
  }

  public async buildTokens(user: User) {
    const accessTokenPayload: AccessTokenPayload = { userId: user.id };
    const refreshTokenPayload: RefreshTokenPayload = {
      userId: user.id,
      version: user.refreshTokenVersion,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload);
    const refreshToken = this.jwtService.sign(refreshTokenPayload);

    return { accessToken, refreshToken };
  }

  // Use this for password reset and password change
  public async invalidateRefreshToken(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenVersion: { increment: 1 } },
    });
  }
}
