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
import { AuthService } from './auth.service';
import RegisterResponse from './response/register.response';
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

  async function setupUser(
    password: string,
    email = 'john-doe@example.com',
    hasConfirmedEmail = true
  ): Promise<User> {
    const user = await entityFactory.generateUser({
      email,
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: password,
      hasConfirmedEmail,
    });

    return await dataService.user.create({ data: user });
  }

  describe('register', () => {
    beforeEach(async () => await truncateTables(dataService));

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
      ).resolves.toEqual<RegisterResponse>({
        accessToken: 'token',
        refreshToken: 'token',
        user: expect.objectContaining<RegisterResponse['user']>({
          id: expect.anything(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          hasConfirmedEmail: false,
        }),
      });

      expect(courierService.sendConfirmAccountEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    beforeEach(async () => await truncateTables(dataService));

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
});
