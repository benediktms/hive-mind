import {
  LoginInput,
  useLoginMutation,
} from '@hive-mind/client-data-access-gql';
import { useNotificationStore } from '@hive-mind/client-notifications';
// import { LoginSchema } from '@hive-mind/client/validation';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCurrentUserStore } from '../stores/currentUserStore';

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
      setCurrentUser(null);

      addNotification({
        message: (e as Error).message,
        type: 'error',
      });
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      maxWidth={400}
      sx={{
        '& > div': { mb: '1rem' },
      }}
    >
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => handleSubmit({ email, password })}
      >
        Log in
      </Button>
    </Box>
  );
};
