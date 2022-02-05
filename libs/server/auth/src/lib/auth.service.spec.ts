import {
  DataService,
  EntityFactory,
  mockClass,
  truncateTables,
} from '@hive-mind/server-data';
import { CourierService } from '@hive-mind/server/courier';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import dayjs from 'dayjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let dataService: DataService;
  const courierService = mockClass<CourierService>({
    sendConfirmAccountEmail: jest.fn(),
  });

  const entityFactory = new EntityFactory();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        DataService,
        {
          provide: JwtService,
          useValue: mockClass<JwtService>({
            sign: jest.fn(() => 'token'),
          }),
        },
        ConfigService,
        TokenService,
        UserService,
        {
          provide: CourierService,
          useValue: courierService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    dataService = module.get(DataService);

    await dataService.$connect();
  });

  afterAll(async () => {
    await dataService.$disconnect();
    await module.close();
  });

  beforeEach(async () => await truncateTables(dataService));

  async function setupUser(
    password: string,
    email = 'john-doe@example.com',
    hasConfirmedEmail = true,
    authToken: string | undefined = undefined,
    authTokenExpiresAt: Date | undefined = undefined
  ): Promise<User> {
    const user = await entityFactory.generateUser({
      email,
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: password,
      hasConfirmedEmail,
      authToken,
      authTokenExpiresAt,
    });

    return await dataService.user.create({ data: user });
  }

  describe('register', () => {
    it('should not create a new user if the email is already taken', async () => {
      const taken = await setupUser('helloworld');

      await expect(
        authService.register({
          email: taken.email,
          firstName: taken.firstName,
          lastName: taken.lastName,
          password: 'helloworld',
        })
      ).rejects.toThrow(/this email is already being used/i);

      expect(courierService.sendConfirmAccountEmail).not.toHaveBeenCalled();
    });

    it('should create a user', async () => {
      const user = await entityFactory.generateUser({
        email: 'john-doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      await expect(
        authService.register({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: 'helloworld',
        })
      ).resolves.toEqual(
        'Sign up successful. Please check your email to confirm your account.'
      );

      expect(courierService.sendConfirmAccountEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should log the user in', async () => {
      const user = await setupUser('helloworld');

      await expect(
        authService.login(user.email, 'helloworld')
      ).resolves.toEqual(
        expect.objectContaining({
          user: expect.objectContaining({ email: 'john-doe@example.com' }),
          accessToken: 'token',
        })
      );
    });

    it('should not log the user in if credentials are incorrect', async () => {
      const user = await setupUser('helloworld');

      await expect(authService.login(user.email, 'wrong')).rejects.toThrow(
        /something went wrong/i
      );
    });

    it('should not log the user in if the email has not been confirmed', async () => {
      const user = await setupUser('helloworld', 'john@example.com', false);

      await expect(authService.login(user.email, 'helloworld')).rejects.toThrow(
        /user has not confirmed email/i
      );
    });
  });

  describe('confirmEmail', () => {
    it('should fail if the token has expired', async () => {
      const user = await setupUser(
        'helloworld',
        'john@example.com',
        false,
        'token',
        dayjs().subtract(1, 'day').toDate()
      );

      console.log(user.authToken);

      await expect(
        authService.confirmEmail(user.email, 'token')
      ).rejects.toThrow(/invalid token/i);
    });

    it('should fail if the tokens do not match', async () => {
      const user = await setupUser(
        'helloworld',
        'john@example.com',
        false,
        'token',
        dayjs().subtract(1, 'day').toDate()
      );

      await expect(
        authService.confirmEmail(user.email, 'wrong_token')
      ).rejects.toThrow(/tokens do not match/i);
    });

    it('should fail if the user has already confirmed their email', async () => {
      const user = await setupUser(
        'helloworld',
        'john@example.com',
        true,
        'token'
      );

      await expect(
        authService.confirmEmail(user.email, 'token')
      ).rejects.toThrow(/user has already confirmed email/i);
    });

    it('should remove the users auth token and set "hasConfirmedEmail" to true', async () => {
      const user = await setupUser(
        'helloworld',
        'john@example.com',
        false,
        'token',
        dayjs().add(1, 'day').toDate()
      );

      await authService.confirmEmail(user.email, 'token');

      const updatedUser = await dataService.user.findUnique({
        where: { id: user.id },
      });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      expect(updatedUser.hasConfirmedEmail).toBe(true);
    });
  });
});
