import { CurrentUser } from '@hive-mind/shared';
import { RequestHandler, rest } from 'msw';
import { setupServer } from 'msw/node';

export function setupMockServer(
  additionalHandlers?: RequestHandler[],
  url?: string
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URI || url;

  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URI is not defined');

  const handlers: RequestHandler[] = [
    rest.post(`${apiUrl}/refresh_token`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
        })
      );
    }),
    rest.get(`${apiUrl}/me`, (_req, res, ctx) => {
      const user: CurrentUser = {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      return res(
        ctx.status(200),
        ctx.json({
          user,
        })
      );
    }),
  ];

  if (additionalHandlers) {
    handlers.push(...additionalHandlers);
  }

  return setupServer(...handlers);
}
