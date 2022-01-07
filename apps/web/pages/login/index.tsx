import { Heading, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { Form, LabeledTextField } from '@grp-org/client-components';
import { LoginSchema } from '@grp-org/client/validation';
import { useLoginMutation, LoginInput } from '@grp-org/client/gql';

export function Login() {
  const [loginMutation] = useLoginMutation();
  const toast = useToast();

  const handleSubmit = async (input: LoginInput) => {
    try {
      await loginMutation({
        variables: {
          input,
        },
      });

      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
      });
    } catch (e) {
      toast({ title: 'Login Failed', description: e.message, status: 'error' });
    }
  };

  return (
    <div>
      <Heading>login</Heading>
      <Link href="/">Home</Link>
      <Form
        schema={LoginSchema}
        submitText="Login"
        onSubmit={handleSubmit}
        initialValues={{ email: '', password: '' }}
      >
        <LabeledTextField name="email" label="Email" type="email" />
        <LabeledTextField name="password" label="Password" type="password" />
      </Form>
    </div>
  );
}

export default Login;
