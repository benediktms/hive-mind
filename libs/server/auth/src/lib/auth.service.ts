import { PrismaService } from '@hive-mind/server-prisma';
import { Injectable } from '@nestjs/common';
import { SALT_LENGTH, SALT_ROUNDS } from '../utils/constants';
import RegisterDTO from './dto/register.dto';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { FailedToAuthenticateError } from '../utils/failed-to-authenticate-error';
import { EmailTakenError } from '../utils/email-taken-error';
import { CourierService } from '@hive-mind/server/courier';
import { nanoid } from 'nanoid';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly courierService: CourierService,
    private readonly userService: UserService
  ) {}

  public async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new FailedToAuthenticateError();
    }

    this.checkUserHasConfirmedEmail(user.hasConfirmedEmail);

    await this.validatePassword(user.passwordHash, password);

    const { accessToken, refreshToken } = await this.tokenService.buildTokens(
      user
    );

    return { user, accessToken, refreshToken };
  }

  public async register(input: RegisterDTO) {
    const taken = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (taken) {
      throw new EmailTakenError();
    }

    const passwordHash = await this.createPassword(input.password);

    const user = await this.prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        passwordHash,
        authToken: nanoid(),
        authTokenExpiresAt: dayjs().add(1, 'day').toDate(),
        hasConfirmedEmail: false,
      },
    });

    if (!user.authToken) {
      throw new Error('Failed to create auth token');
    }

    // TODO: This should eventually be moved into a task queue maybe?
    await this.courierService.sendConfirmAccountEmail(
      user.id,
      user.firstName,
      user.email,
      user.authToken
    );

    return 'Sign up successful. Please check your email to confirm your account.';
  }

  private checkAuthTokens(
    incomingToken: string | null,
    existingToken: string | null,
    authTokenExpiresAt: Date | null
  ) {
    if (incomingToken !== existingToken) {
      throw new Error('Tokens do not match');
    }

    if (!incomingToken || dayjs().isAfter(authTokenExpiresAt)) {
      throw new Error('Invalid token');
    }
  }

  private checkUserHasConfirmedEmail(
    hasConfirmedEmail: boolean,
    shouldBeConfirmed = false
  ) {
    if (!shouldBeConfirmed && !hasConfirmedEmail) {
      throw new Error('User has not confirmed email');
    }

    if (shouldBeConfirmed && hasConfirmedEmail) {
      throw new Error('User has already confirmed email');
    }
  }

  public async confirmEmail(email: string, token: string) {
    const user = await this.userService.getUserByEmail(email);

    this.checkAuthTokens(token, user.authToken, user.authTokenExpiresAt);
    this.checkUserHasConfirmedEmail(user.hasConfirmedEmail, true);

    await this.prisma.user.update({
      where: { email },
      data: { authToken: null, hasConfirmedEmail: true },
    });

    const { accessToken, refreshToken } = await this.tokenService.buildTokens(
      user
    );

    return { accessToken, refreshToken };
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

  public async requestPasswordReset(email: string) {
    const user = await this.prisma.user.update({
      where: { email },
      data: {
        authToken: nanoid(),
        authTokenExpiresAt: dayjs().add(15, 'minute').toDate(),
      },
    });

    this.checkUserHasConfirmedEmail(user.hasConfirmedEmail);

    if (!user.authToken) throw new Error('Failed to create auth token');

    await this.courierService.sendRequestResetEmail(
      user.id,
      user.email,
      user.authToken
    );

    return {
      token: user.authToken,
      email: user.email,
    };
  }

  public async resetPassword(email: string, password: string, token: string) {
    const user = await this.userService.getUserByEmail(email);

    this.checkUserHasConfirmedEmail(user.hasConfirmedEmail);

    this.checkAuthTokens(token, user.authToken, user.authTokenExpiresAt);

    await this.prisma.user.update({
      where: { email },
      data: { authToken: null, authTokenExpiresAt: null },
    });

    const passwordHash = await this.createPassword(password);

    await this.prisma.user.update({
      where: { email },
      data: { passwordHash, refreshTokenVersion: { increment: 1 } },
    });
  }
}
