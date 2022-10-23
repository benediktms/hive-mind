import {
  RequestPasswordResetInput,
  useRequestResetMutation,
} from '@hive-mind/client-data-access-gql';
import { useNotificationStore } from '@hive-mind/client-notifications';
import { addTextFieldError, emailSchema } from '@hive-mind/client/validation';
import { normalizeError } from '@hive-mind/shared';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Form } from './Form';

export const RequestResetForm = () => {
  const [requestResetMutation] = useRequestResetMutation();
  const [email, setEmail] = useState('');
  const { addNotification } = useNotificationStore();

  const handleSubmit = async (input: RequestPasswordResetInput) => {
    try {
      const { data, errors } = await requestResetMutation({
        variables: { input },
      });

      if (data) {
        addNotification({
          type: 'info',
          message:
            'Password reset email sent. Please check your email and follow the instructions',
        });
      } else {
        throw errors;
      }
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
        label="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        {...(email && addTextFieldError(emailSchema, email))}
      />
      <Button onClick={() => handleSubmit({ email })}>Reset Password</Button>
    </Form>
  );
};
