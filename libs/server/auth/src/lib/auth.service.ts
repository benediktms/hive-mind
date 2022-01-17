import { DataService } from '@grp-org/server-data';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';
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
import { VerifyTokenResponse } from './response/verify-token.response';
import {
  AccessTokenPayload,
  Cookies,
  JwtPayload,
  RefreshTokenPayload,
  TokenExpiration,
} from '@grp-org/shared';
import { nanoid } from 'nanoid';
import LoginResponse from './response/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataService: DataService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async login(email: string, password: string) {
    const user = await this.dataService.user.findUnique({ where: { email } });

    if (!user) {
      throw new FailedToAuthenticateError();
    }

    await this.validatePassword(user.passwordHash, password);

    const token = this.signAccessToken(user.id, user.refreshTokenVersion);

    return new LoginResponse(user, token);
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
      },
    });

    // const token = this.signAccessToken(user.id, user.refreshTokenVersion);
    const { accessToken, refreshToken } = await this.buildTokens(user);

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

  private signAccessToken(userId: number, tokenVersion: number) {
    const payload: JwtPayload = { userId, tokenVersion };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '15m',
      jwtid: nanoid(),
    });

    return token;
  }

  private signRefreshToken(userId: number, tokenVersion: number) {
    const payload: JwtPayload = { userId, tokenVersion };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '3d',
      jwtid: nanoid(),
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
    const accessTokenOptions: CookieOptions = {
      ...this.defaultCookieOptions,
      maxAge: TokenExpiration.Access,
    };

    const refreshTokenOptions: CookieOptions = {
      ...this.defaultCookieOptions,
      maxAge: TokenExpiration.Refresh,
    };

    res.cookie(Cookies.AccessToken, accessToken, accessTokenOptions);

    if (refreshToken)
      res.cookie(Cookies.RefreshToken, refreshToken, refreshTokenOptions);
  }

  public async verifyAccessToken(req: Request, res: Response): Promise<void> {
    const token = req.signedCookies[Cookies.AccessToken];

    if (!token) {
      res.send(new VerifyTokenResponse(false, ''));
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: this.configService.get('jwtSecret'),
      });

      const user = await this.dataService.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (payload.tokenVersion !== user.refreshTokenVersion) {
        res.send(new VerifyTokenResponse(false, ''));
      }

      const refreshToken = this.signRefreshToken(
        user.id,
        user.refreshTokenVersion
      );

      this.setTokens(res, refreshToken);

      res.send(new VerifyTokenResponse(true, refreshToken));
    } catch (e) {
      Logger.error(e);
    }
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

  private async buildTokens(user: User) {
    const accessTokenPayload: AccessTokenPayload = { userId: user.id };
    const refreshTokenPayload: RefreshTokenPayload = {
      userId: user.id,
      version: user.refreshTokenVersion,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      jwtid: nanoid(),
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      jwtid: nanoid(),
    });

    return { accessToken, refreshToken };
  }
}
