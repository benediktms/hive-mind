import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from '@hive-mind/client-data-access-gql';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { normalizeError } from '@hive-mind/shared';
import { useNotificationStore } from '@hive-mind/client-notifications';
import { Form } from './Form';
import {
  addTextFieldError,
  newPasswordSchema,
  passwordConfirmationSchema,
} from '@hive-mind/client/validation';

type Props = {
  email: string;
  token: string;
};

export const ResetPasswordForm = ({ email, token }: Props) => {
  const { addNotification } = useNotificationStore();
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

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

      addNotification({
        type: 'success',
        message: 'Password reset successful',
      });
    } catch (e) {
      const error = normalizeError(e);
      addNotification({
        type: 'error',
        message: error.message,
      });
    }
  };

  return (
    <Form>
      <TextField
        label="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        {...(password && addTextFieldError(newPasswordSchema, password))}
      />
      <TextField
        label="passwordConfirmation"
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
        {...(passwordConfirmation &&
          addTextFieldError(passwordConfirmationSchema, {
            password,
            passwordConfirmation,
          }))}
      />
      <Button onClick={() => handleSubmit(password)}>Reset Password</Button>
    </Form>
  );
};
