import {
  RequestPasswordResetInput,
  useRequestResetMutation,
} from '@hive-mind/client-data-access-gql';
// import { RequestResetSchema } from '@hive-mind/client/validation';
// import { normalizeError } from '@hive-mind/shared';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useState } from 'react';

export const RequestResetForm = () => {
  const [requestResetMutation] = useRequestResetMutation();
  // const toast = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = async (input: RequestPasswordResetInput) => {
    try {
      const { data, errors } = await requestResetMutation({
        variables: { input },
      });

      if (data) {
        // toast({
        //   status: 'success',
        //   title: 'Password reset email was sent',
        //   description: 'Please check your email and follow the instructions',
        // });
      } else {
        throw errors;
      }
    } catch (e) {
      // const error = normalizeError(e);
      console.log(e);
      // toast({
      //   status: 'error',
      //   title: 'Something went wrong',
      //   description: error.message,
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
      <Button onClick={() => handleSubmit({ email })}>Reset Password</Button>
    </FormControl>
  );
};
