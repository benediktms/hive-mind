import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from '@hive-mind/client-data-access-gql';
import { FormControl, InputLabel, Input, Button } from '@mui/material';
import { useState } from 'react';
// import { ResetPasswordSchema } from '@hive-mind/client/validation';
// import { normalizeError } from '@hive-mind/shared';

type Props = {
  email: string;
  token: string;
};

export const ResetPasswordForm = ({ email, token }: Props) => {
  const [resetPassword] = useResetPasswordMutation();
  // const toast = useToast();
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

      // toast({
      //   status: 'success',
      //   title: 'Password reset successful',
      //   description: 'You can now login with your new password',
      // });
    } catch (e) {
      // const error = normalizeError(e);
      // toast({
      //   status: 'error',
      //   title: 'Something went wrong',
      //   description: error.message,
      // });
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
