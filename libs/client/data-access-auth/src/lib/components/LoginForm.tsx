import {
  LoginInput,
  useLoginMutation,
} from '@hive-mind/client-data-access-gql';
// import { LoginSchema } from '@hive-mind/client/validation';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCurrentUserStore } from '../stores/currentUserStore';

export const LoginForm = () => {
  const [loginMutation] = useLoginMutation();
  // const toast = useToast();
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
        // toast({
        //   title: 'Login Successful',
        //   description: `Welcome back, ${data.login.message}!`,
        //   status: 'success',
        // });

        setCurrentUser(data.login.user);

        await router.push('/me');
      } else {
        throw errors;
      }
    } catch (e) {
      setCurrentUser(null);
      // toast({
      //   title: 'Login Failed',
      //   description: (e as Error).message,
      //   status: 'error',
      // });
    }
  };

  return (
    <FormControl>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <InputLabel htmlFor="password">Email</InputLabel>
      <Input
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={() => handleSubmit({ email, password })}>Log in</Button>
    </FormControl>
  );
};
