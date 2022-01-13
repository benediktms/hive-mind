import { IndexPage } from './IndexPage';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import { AuthProvider } from '@grp-org/client-data-access-auth';
import '@testing-library/jest-dom';

describe('IndexPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', () => {
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
