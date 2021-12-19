import { DataService } from '@grp-org/data';
import { Injectable } from '@nestjs/common';

import { SALT_LENGTH, SALT_ROUNDS } from '../utils/constants';
import RegisterDTO from './dto/register.dto';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { FailedToAuthenticateError } from '../utils/failed-to-authenticate-error';
import LoginResponse from './response/register.response';
import RegisterResponse from './response/register.response';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly dataService: DataService,
    private readonly jwtService: JwtService
  ) {}

  public async login(email: string, password: string) {
    const user = await this.dataService.user.findUnique({ where: { email } });

    if (!user) {
      throw new FailedToAuthenticateError();
    }

    await this.validatePassword(user.passwordHash, password);

    const token = await this.signToken(user.id);

    return new LoginResponse(user, token);
  }

  public async register(input: RegisterDTO) {
    try {
      const passwordHash = await this.createPassword(input.password);

      const user = await this.dataService.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          passwordHash,
        },
      });

      const token = await this.signToken(user.id);

      return new RegisterResponse(user, token);
    } catch (e) {
      throw new FailedToAuthenticateError(e as Error);
    }
  }

  public async validateUser(id: number) {
    return await this.dataService.user.findUnique({
      where: { id },
    });
  }

  private async signToken(userId: number) {
    const payload: JwtDto = { userId };
    return this.jwtService.sign(payload);
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
