import { DataService, truncateTables } from '@grp-org/data';
import { EntityFactory, mockClass } from '@grp-org/factory';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import AuthService from './auth.service';

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
      ).resolves.toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
          token: 'token',
        })
      );
    });

    it.todo('should create a user');
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
