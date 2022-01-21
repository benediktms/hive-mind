import { IndexPage } from './IndexPage';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('IndexPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    await waitFor(async () => {
      render(
        <MockedProvider>
          <IndexPage />
        </MockedProvider>
      );
    });

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent('index');
  });
});
