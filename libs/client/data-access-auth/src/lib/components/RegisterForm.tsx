import {
  RegisterInput,
  useRegisterMutation,
} from '@hive-mind/client-data-access-gql';
import { useNotificationStore } from '@hive-mind/client-notifications';
// import { RegisterSchema } from '@hive-mind/client/validation';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const RegisterForm = () => {
  const [registerMutation] = useRegisterMutation();
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (input: RegisterInput) => {
    try {
      const { data, errors } = await registerMutation({
        variables: { input },
      });

      if (data) {
        addNotification({
          type: 'success',
          message: 'Welcome to the party! You are now ready to use grp',
        });

        await router.push('/confirm');
      } else {
        throw errors;
      }
    } catch (e) {
      addNotification({
        type: 'error',
        message: (e as Error).message,
      });
    }
  };

  return (
    <FormControl>
      <InputLabel htmlFor="firstName">First Name</InputLabel>
      <Input
        id="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <InputLabel htmlFor="lastName">Last Name</InputLabel>
      <Input
        id="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
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
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        onClick={() => handleSubmit({ email, firstName, lastName, password })}
      >
        Register
      </Button>
    </FormControl>
  );
};
