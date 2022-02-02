import { DataService } from '@hive-mind/server-data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response, CookieOptions } from 'express';
import { SALT_LENGTH, SALT_ROUNDS } from '../utils/constants';
import RegisterDTO from './dto/register.dto';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { FailedToAuthenticateError } from '../utils/failed-to-authenticate-error';
import RegisterResponse from './response/register.response';
import { JwtService } from '@nestjs/jwt';
import { EmailTakenError } from '../utils/email-taken-error';
import { ConfigService } from '@nestjs/config';
import { User } from '.prisma/client';
import {
  AccessToken,
  AccessTokenPayload,
  Cookies,
  RefreshToken,
  RefreshTokenPayload,
  TokenExpiration,
} from '@hive-mind/shared';
import dayjs from 'dayjs';
import { CourierService } from '@hive-mind/server/courier';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataService: DataService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly courierService: CourierService
  ) {}

  public async getUserById(id: number) {
    const user = await this.dataService.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  public async login(email: string, password: string) {
    const user = await this.dataService.user.findUnique({ where: { email } });

    if (!user) {
      throw new FailedToAuthenticateError();
    }

    await this.validatePassword(user.passwordHash, password);

    const { accessToken, refreshToken } = await this.buildTokens(user);

    return { accessToken, refreshToken, user };
  }

  public async register(input: RegisterDTO) {
    const taken = await this.dataService.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (taken) {
      throw new EmailTakenError();
    }

    const passwordHash = await this.createPassword(input.password);

    const user = await this.dataService.user.create({
      data: {
        email: input.email.toLowerCase(),
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        passwordHash,
        authToken: nanoid(),
      },
    });

    if (!user.authToken) {
      throw new Error('Failed to create auth token');
    }

    const { accessToken, refreshToken } = await this.buildTokens(user);

    // TODO: This should eventually be moved into a task queue
    await this.courierService.sendConfirmAccountEmail(
      user.id,
      user.firstName,
      user.email,
      user.authToken
    );

    return new RegisterResponse(user, accessToken, refreshToken);
  }

  public async validateUser(id: number): Promise<User> {
    const user = await this.dataService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private signAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('accessTokenSecret'),
      expiresIn: TokenExpiration.Access,
    });
  }

  private signRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('refreshTokenSecret'),
      expiresIn: TokenExpiration.Refresh,
    });
  }

  private isProd = this.configService.get('environment') === 'production';

  private defaultCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: this.isProd,
    sameSite: this.isProd ? 'strict' : 'lax',
    domain: this.configService.get('baseDomain') as string,
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
      this.configService.get('refreshTokenSecret')
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

  private async buildTokens(user: User) {
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
    await this.dataService.user.update({
      where: { id: userId },
      data: { refreshTokenVersion: { increment: 1 } },
    });
  }

  private async createPassword(userInput: string): Promise<string> {
    const salt = randomBytes(SALT_ROUNDS);

    return await hash(userInput, {
      salt,
      saltLength: SALT_LENGTH,
    });
  }

  private async validatePassword(password: string, attempt: string) {
    const attemptIsVerified = await verify(password, attempt);

    if (!attemptIsVerified) {
      throw new FailedToAuthenticateError();
    }
  }
}
