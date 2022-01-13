import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
import '@testing-library/jest-dom';
import { AuthProvider } from '@grp-org/client-data-access-auth';
import { setupMockServer } from '@grp-org/client/mocks';

describe('LoginPage ', () => {
  setupMockServer();

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    render(
      <AuthProvider>
        <MockedProvider>
          <RegisterPage />
        </MockedProvider>
      </AuthProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Register');
  });
});
