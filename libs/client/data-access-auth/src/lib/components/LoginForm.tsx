import { Container, Heading, useToast } from '@chakra-ui/react';
import {
  LoginInput,
  useLoginMutation,
} from '@hive-mind/client-data-access-gql';
import { Form, LabeledTextField } from '@hive-mind/client-ui-form';
import { LoginSchema } from '@hive-mind/client/validation';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  // const { setUser } = useCurrentUser();
  const [loginMutation] = useLoginMutation();
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (input: LoginInput) => {
    try {
      const { data, errors } = await loginMutation({
        variables: { input },
      });

      if (data) {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${data.login.message}!`,
          status: 'success',
        });

        await router.push('/');
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
        // initialValues={{ email: '', password: '' }}
        initialValues={{ email: 'ben@example.com', password: 'helloworld' }}
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
