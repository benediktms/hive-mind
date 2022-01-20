import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import '@testing-library/jest-dom';
import { CurrentUserProvider } from '@grp-org/client-data-access-auth';

describe('LoginPage ', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    await waitFor(async () => {
      render(
        <CurrentUserProvider>
          <MockedProvider>
            <LoginPage />
          </MockedProvider>
        </CurrentUserProvider>
      );
    });

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent('Login');
  });
});
