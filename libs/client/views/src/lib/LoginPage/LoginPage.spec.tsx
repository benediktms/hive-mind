import { MockedProvider } from '@apollo/client/testing';
import { setupMockServer } from '@grp-org/client/mocks';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import '@testing-library/jest-dom';
import { AuthProvider } from '@grp-org/client-data-access-auth';

describe('LoginPage ', () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000';

  setupMockServer(apiUrl);

  it('should render successfully', async () => {
    render(
      <AuthProvider>
        <MockedProvider>
          <LoginPage />
        </MockedProvider>
      </AuthProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Login');
  });
});
