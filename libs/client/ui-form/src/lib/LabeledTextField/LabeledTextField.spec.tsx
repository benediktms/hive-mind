import { render, screen } from '@testing-library/react';
import LabeledTextField from './LabeledTextField';

describe('LabeledTextField', () => {
  it.skip('should render correctly', () => {
    render(<LabeledTextField name="email" label="Email" placeholder="Email" />);
    const element = screen.getByText(/email/i);

    expect(element).toBeInTheDocument();
  });
});
