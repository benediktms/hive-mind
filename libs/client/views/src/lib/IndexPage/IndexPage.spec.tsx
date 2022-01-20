import { IndexPage } from './IndexPage';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CurrentUserProvider } from '@grp-org/client-data-access-auth';

describe('IndexPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    render(
      <CurrentUserProvider>
        <MockedProvider>
          <IndexPage />
        </MockedProvider>
      </CurrentUserProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('index');
  });
});
