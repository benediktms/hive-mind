import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
import '@testing-library/jest-dom';
import { CurrentUserProvider } from '@grp-org/client-data-access-auth';

describe('LoginPage ', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    render(
      <CurrentUserProvider>
        <MockedProvider>
          <RegisterPage />
        </MockedProvider>
      </CurrentUserProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Register');
  });
});
