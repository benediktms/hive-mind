import { DataService } from '@hive-mind/server-data';
import { Injectable } from '@nestjs/common';
import { SALT_LENGTH, SALT_ROUNDS } from '../utils/constants';
import RegisterDTO from './dto/register.dto';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { FailedToAuthenticateError } from '../utils/failed-to-authenticate-error';
import RegisterResponse from './response/register.response';
import { EmailTakenError } from '../utils/email-taken-error';
import { CourierService } from '@hive-mind/server/courier';
import { nanoid } from 'nanoid';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataService: DataService,
    private readonly tokenService: TokenService,
    private readonly courierService: CourierService
  ) {}

  public async login(email: string, password: string) {
    const user = await this.dataService.user.findUnique({ where: { email } });

    if (!user) {
      throw new FailedToAuthenticateError();
    }

    await this.validatePassword(user.passwordHash, password);

    const { accessToken, refreshToken } = await this.tokenService.buildTokens(
      user
    );

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

    const { accessToken, refreshToken } = await this.tokenService.buildTokens(
      user
    );

    // TODO: This should eventually be moved into a task queue maybe?
    await this.courierService.sendConfirmAccountEmail(
      user.id,
      user.firstName,
      user.email,
      user.authToken
    );

    return new RegisterResponse(user, accessToken, refreshToken);
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
