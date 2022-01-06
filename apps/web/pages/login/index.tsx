import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { Form, LabeledTextField } from '@grp-org/client-components';
import { LoginSchema } from '@grp-org/client/validation';

export function login() {
  return (
    <div>
      <Heading>login</Heading>
      <Link href="/">Home</Link>
      <Form
        schema={LoginSchema}
        submitText="Login"
        onSubmit={console.log}
        initialValues={{ email: '', password: '' }}
      >
        <LabeledTextField name="email" label="Email" type="email" />
        <LabeledTextField name="password" label="Password" type="password" />
      </Form>
    </div>
  );
}

export default login;
