import {
  LoginInput,
  useLoginMutation,
} from '@hive-mind/client-data-access-gql';
import { useNotificationStore } from '@hive-mind/client-notifications';
import {
  addTextFieldError,
  emailSchema,
  loginSchema,
  passwordSchema,
} from '@hive-mind/client/validation';
import { normalizeError, validateSchema } from '@hive-mind/shared';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCurrentUserStore } from '../stores/currentUserStore';
import { Form } from './Form';

export const LoginForm = () => {
  const [loginMutation] = useLoginMutation();
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const setCurrentUser = useCurrentUserStore(state => state.setCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (input: LoginInput) => {
    try {
      const { data, errors } = await loginMutation({
        variables: { input },
      });

      if (data) {
        addNotification({
          message: `Welcome back, ${data.login.message}!`,
          type: 'success',
        });

        setCurrentUser(data.login.user);

        await router.push('/me');
      } else {
        throw errors;
      }
    } catch (e) {
      const error = normalizeError(e);
      setCurrentUser(null);

      addNotification({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Form>
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        {...(email && addTextFieldError(emailSchema, email))}
      />
      <TextField
        label="password"
        value={password}
        type="password"
        onChange={e => {
          const value = e.target.value;
          setPassword(value);
        }}
        {...(password && addTextFieldError(passwordSchema, password))}
      />
      <Button
        variant="contained"
        onClick={() => handleSubmit({ email, password })}
        disabled={
          validateSchema(loginSchema, { email, password }).errors.length > 0
        }
      >
        Log in
      </Button>
    </Form>
  );
};
