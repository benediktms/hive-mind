import { RequestHandler, rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

export function setupMockServer(additionalHandlers?: RequestHandler[]) {
  const url = process.env.NEXT_PUBLIC_API_URI as string;

  const handlers: RequestHandler[] = [
    rest.post(`${url}/refresh_token`, (_req, res, ctx) => {
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

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
