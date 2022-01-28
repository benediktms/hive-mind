import { setupMockServer } from '@hive-mind/client/mocks';

const server = setupMockServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
