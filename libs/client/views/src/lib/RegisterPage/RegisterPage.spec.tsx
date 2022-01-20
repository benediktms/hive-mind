import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
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
            <RegisterPage />
          </MockedProvider>
        </CurrentUserProvider>
      );
    });

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent('Register');
  });
});
