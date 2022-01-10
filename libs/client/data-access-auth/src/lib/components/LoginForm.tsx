import { Container, Heading, useToast } from '@chakra-ui/react';
import { LoginInput, useLoginMutation } from '@grp-org/client-data-access-gql';
import { Form, LabeledTextField } from '@grp-org/client-ui-form';
import { LoginSchema } from '@grp-org/client/validation';
import Link from 'next/link';
import { useAuthContext } from '../hooks/useAuthContext';

export const LoginForm = () => {
  const { setToken } = useAuthContext();
  const [loginMutation] = useLoginMutation();
  const toast = useToast();

  const handleSubmit = async (input: LoginInput) => {
    try {
      const { data, errors } = await loginMutation({
        variables: { input },
      });

      if (data) {
        setToken(data.login.token);

        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
          status: 'success',
        });
      } else {
        throw errors;
      }
    } catch (e) {
      toast({
        title: 'Login Failed',
        description: (e as Error).message,
        status: 'error',
      });
    }
  };

  return (
    <Container>
      <Heading variant="h1" textAlign="center" my={5}>
        Login
      </Heading>

      <Form
        submitText="Login"
        schema={LoginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>
      <Link href="/">Home</Link>
    </Container>
  );
};
