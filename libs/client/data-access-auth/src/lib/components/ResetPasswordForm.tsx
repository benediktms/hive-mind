import { useToast } from '@chakra-ui/react';
import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from '@hive-mind/client-data-access-gql';
import { Form, LabeledTextField } from '@hive-mind/client-ui-form';
import { ResetPasswordSchema } from '@hive-mind/client/validation';
import { normalizeError } from '@hive-mind/shared';

type Props = {
  email: string;
  token: string;
};

export const ResetPasswordForm = ({ email, token }: Props) => {
  const [resetPassword] = useResetPasswordMutation();
  const toast = useToast();

  const handleSubmit = async (password: ResetPasswordInput['password']) => {
    try {
      await resetPassword({
        variables: {
          input: {
            email,
            password,
            token,
          },
        },
      });

      toast({
        status: 'success',
        title: 'Password reset successful',
        description: 'You can now login with your new password',
      });
    } catch (e) {
      const error = normalizeError(e);

      toast({
        status: 'error',
        title: 'Something went wrong',
        description: error.message,
      });
    }
  };

  return (
    <Form
      submitText="Reset password"
      schema={ResetPasswordSchema}
      initialValues={{ password: '', passwordConfirmation: '' }}
      onSubmit={async (e) => handleSubmit(e.password)}
    >
      <LabeledTextField
        name="password"
        label="Password"
        placeholder="Enter your new password"
        type="password"
      />
      <LabeledTextField
        name="passwordConfirmation"
        label="Confirm password"
        placeholder="Confirm your new password"
        type="password"
      />
    </Form>
  );
};
