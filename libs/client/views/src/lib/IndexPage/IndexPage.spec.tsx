import { IndexPage } from './IndexPage';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import { setupMockServer } from '@grp-org/client/mocks';
import { AuthProvider } from '@grp-org/client-data-access-auth';

describe('IndexPage', () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000';

  setupMockServer(apiUrl);

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    render(
      <AuthProvider>
        <MockedProvider>
          <IndexPage />
        </MockedProvider>
      </AuthProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('index');
  });
});
