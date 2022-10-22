import {
  RegisterInput,
  useRegisterMutation,
} from '@hive-mind/client-data-access-gql';
import { useNotificationStore } from '@hive-mind/client-notifications';
import {
  addTextFieldError,
  emailSchema,
  nameSchema,
  newPasswordSchema,
  passwordConfirmationSchema,
} from '@hive-mind/client/validation';
import { registerSchema } from '@hive-mind/client/validation';
import { validateSchema } from '@hive-mind/shared';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from './Form';

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
      console.log(input);

      const { data, errors } = await registerMutation({
        variables: { input },
      });

      console.log(data);

      if (data) {
        addNotification({
          type: 'success',
          message: 'Welcome to the party! You are now ready to use Hive Mind',
        });

        await router.push('/confirm');
      } else {
        throw errors;
      }
    } catch (e) {
      console.log(e);

      addNotification({
        type: 'error',
        message: (e as Error).message,
      });
    }
  };

  return (
    <Form>
      <TextField
        label="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        {...(firstName && addTextFieldError(nameSchema, firstName))}
      />
      <TextField
        label="Last name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        {...(lastName && addTextFieldError(nameSchema, lastName))}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        {...(password && addTextFieldError(newPasswordSchema, password))}
      />
      <TextField
        label="Password"
        type="password"
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
        {...(passwordConfirmation &&
          addTextFieldError(passwordConfirmationSchema, {
            password,
            passwordConfirmation,
          }))}
      />
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        {...(email && addTextFieldError(emailSchema, email))}
      />
      <Button
        variant="contained"
        onClick={() => handleSubmit({ email, firstName, lastName, password })}
        disabled={
          validateSchema(registerSchema, {
            email,
            firstName,
            lastName,
            password,
            passwordConfirmation,
          }).errors.length > 0
        }
      >
        Register
      </Button>
    </Form>
  );
};
