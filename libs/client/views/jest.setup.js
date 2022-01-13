import { setupMockServer } from '@grp-org/client/mocks';

const server = setupMockServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
