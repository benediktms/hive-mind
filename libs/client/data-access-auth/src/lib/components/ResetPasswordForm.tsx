import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from '@hive-mind/client-data-access-gql';
import { FormControl, InputLabel, Input, Button } from '@mui/material';
import { useState } from 'react';
// import { ResetPasswordSchema } from '@hive-mind/client/validation';
import { normalizeError } from '@hive-mind/shared';
import { useNotificationStore } from '@hive-mind/client-notifications';

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
    <FormControl>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <InputLabel htmlFor="passwordConfirmation">
        Password Confirmation
      </InputLabel>
      <Input
        id="passwordConfirmation"
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
      />
      <Button onClick={() => handleSubmit(password)}>Reset Password</Button>
    </FormControl>
  );
};
