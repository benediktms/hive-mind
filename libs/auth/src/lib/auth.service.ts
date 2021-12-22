import { DataService } from '@grp-org/data';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { SALT_LENGTH, SALT_ROUNDS } from '../utils/constants';
import RegisterDTO from './dto/register.dto';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { FailedToAuthenticateError } from '../utils/failed-to-authenticate-error';
import LoginResponse from './response/register.response';
import RegisterResponse from './response/register.response';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';
import { EmailTakenError } from '../utils/email-taken-error';
import { ConfigService } from '@nestjs/config';
import { User } from '.prisma/client';

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

    const token = this.signAccessToken(user.id);

    return new LoginResponse(user, token);
  }

  public async register(input: RegisterDTO) {
    const taken = await this.dataService.user.findUnique({
      where: { email: input.email },
    });

    if (taken) {
      throw new EmailTakenError();
    }

    const passwordHash = await this.createPassword(input.password);

    const user = await this.dataService.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        passwordHash,
      },
    });

    const token = await this.signAccessToken(user.id);

    return new RegisterResponse(user, token);
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

  private signAccessToken(userId: number) {
    const payload: JwtDto = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '15m',
    });
  }

  private signRefreshToken(userId: number) {
    const payload: JwtDto = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '7d',
    });
  }

  public sendAccessToken(res: Response, token: string) {
    res.cookie('ilvad', token, { httpOnly: true, path: '/' });
  }

  public async verifyAccessToken(req: Request, res: Response) {
    const token = req.cookies.ilvad;

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    try {
      const payload: JwtDto = this.jwtService.verify(token, {
        secret: this.configService.get('jwtSecret'),
      });

      const user = await this.dataService.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        return res.send({ ok: false, accessToken: '' });
      }

      this.sendAccessToken(res, this.signRefreshToken(user.id));

      return res.send({ ok: true, accessToken: this.signAccessToken(user.id) });
    } catch (e) {
      Logger.error(e);
    }
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
