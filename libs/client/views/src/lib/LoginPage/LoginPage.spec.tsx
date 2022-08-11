import { MockedProvider } from '@apollo/client/testing';
import { act, cleanup, render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import '@testing-library/jest-dom';

describe('LoginPage ', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    await act(async () => {
      render(
        <MockedProvider>
          <LoginPage />
        </MockedProvider>
      );
    });

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent('Login');
  });
});
