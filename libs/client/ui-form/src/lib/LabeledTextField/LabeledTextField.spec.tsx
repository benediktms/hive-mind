import { LoginSchema } from '@grp-org/client/validation';
import { render, screen } from '@testing-library/react';
import { Form } from '../Form/Form';
import LabeledTextField from './LabeledTextField';
import '@testing-library/jest-dom';

describe('LabeledTextField', () => {
  it('should render correctly', () => {
    render(
      <Form
        onSubmit={() => console.log('submitted')}
        schema={LoginSchema}
        initialValues={{ email: '' }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
      </Form>
    );
    const element = screen.getByText(/email/i);

    expect(element).toBeInTheDocument();
  });
});
