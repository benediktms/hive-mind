import {
  DataService,
  EntityFactory,
  mockClass,
  truncateTables,
} from '@grp-org/data';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { internet } from 'faker';
import { AuthService } from './auth.service';
import RegisterResponse from './response/register.response';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let dataService: DataService;
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
    email = 'john-doe@example.com'
  ): Promise<User> {
    const user = await entityFactory.generateUser({
      email,
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: password,
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
        token: 'token',
        user: expect.objectContaining<RegisterResponse['user']>({
          id: expect.anything(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      });
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
          token: 'token',
        })
      );
    });

    it('should not log the user in if credentials are incorrect', async () => {
      const user = await setupUser('helloworld');

      await expect(authService.login(user.email, 'wrong')).rejects.toThrow(
        /something went wrong/i
      );
    });
  });

  describe('verifyAccessToken', () => {
    beforeAll(async () => await setupUser('helloworld', internet.email()));
    afterAll(async () => await truncateTables(dataService));

    it.todo('should not send a token if the cookie is not set');
    it.todo('should not send a token if the user is not found');
    it.todo('should not send a token if the token version is invalid');
    it.todo('should set a refres token on the cookie');
    it.todo('should return a new access token');
  });
});
