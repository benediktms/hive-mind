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
          ok: true,
          accessToken: 'fake-access-token',
        })
      );
    }),
  ];

  if (additionalHandlers) {
    handlers.push(...additionalHandlers);
  }

  return setupServer(...handlers);
}
