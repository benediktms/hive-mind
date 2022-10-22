import { mockClass } from '@hive-mind/server-prisma';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  const authService = mockClass<AuthService>({
    register: jest.fn(async () => {
      return {
        message: 'message',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: {} as any,
      };
    }),
  });

  beforeEach(() => {
    resolver = new AuthResolver(authService, mockClass(), mockClass());
  });

  it('should fail if an invalid email is provided', async () => {
    await expect(
      resolver.register({
        email: 'd',
        firstName: 'John',
        lastName: 'Doe',
        password: 'helloworld',
        passwordConfirmation: 'helloworld',
      })
    ).rejects.toThrow('hello');

    expect(authService.register).not.toHaveBeenCalled();
  });
});
