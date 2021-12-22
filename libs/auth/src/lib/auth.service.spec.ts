import {
  DataService,
  EntityFactory,
  mockClass,
  truncateTables,
} from '@grp-org/data';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import RegisterResponse from './response/register.response';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let dataService: DataService;
  const entityFactory = new EntityFactory();

  beforeEach(async () => {
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

  afterEach(async () => {
    await dataService.$disconnect();
    await module.close();
  });

  describe('register', () => {
    beforeEach(async () => await truncateTables(dataService));

    it('should not create a new user if the email is already taken', async () => {
      const taken = await entityFactory.generateUser({
        email: 'johndoes@example.com',
        firstName: 'John',
        lastName: 'Doe',
        passwordHash: 'helloworld',
      });

      await dataService.user.create({ data: taken });

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
        email: 'johndoes@example.com',
        firstName: 'John',
        lastName: 'Doe',
        passwordHash: 'helloworld',
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
      const password = 'helloworld';
      const user = await entityFactory.generateUser({
        email: 'login@example.com',
        passwordHash: password,
      });

      await dataService.user.create({ data: user });

      await expect(authService.login(user.email, password)).resolves.toEqual(
        expect.objectContaining({
          user: expect.objectContaining({ email: 'login@example.com' }),
          token: 'token',
        })
      );
    });
  });
});
