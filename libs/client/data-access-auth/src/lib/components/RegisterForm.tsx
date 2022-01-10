import { Container, Heading, useToast } from '@chakra-ui/react';
import {
  RegisterInput,
  useRegisterMutation,
} from '@grp-org/client-data-access-gql';
import { Form, LabeledTextField } from '@grp-org/client-ui-form';
import { RegisterSchema } from '@grp-org/client/validation';
import Link from 'next/link';
import { useAuthContext } from '../hooks/useAuthContext';

export const RegisterForm = () => {
  const [registerMutation] = useRegisterMutation();
  const { setToken } = useAuthContext();
  const toast = useToast();

  const handleSubmit = async (input: RegisterInput) => {
    try {
      const { data, errors } = await registerMutation({
        variables: { input },
      });

      if (data) {
        setToken(data.register.token);

        toast({
          status: 'success',
          title: 'Account creation successfull',
          description: 'Welcome to the party! You are now ready to use grp',
        });
      } else {
        throw errors;
      }
    } catch (e) {
      toast({
        title: 'Signup Failed',
        description: (e as Error).message,
        status: 'error',
      });
    }
  };

  return (
    <Container>
      <Heading variant="h1" textAlign="center" my={5}>
        Register
      </Heading>

      <Form
        submitText="Create Account"
        schema={RegisterSchema}
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
          firstName: '',
          lastName: '',
        }}
        onSubmit={(input) =>
          handleSubmit({
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName,
          })
        }
      >
        <LabeledTextField
          name="firstName"
          label="First Name"
          placeholder="What's your first name?"
        />
        <LabeledTextField
          name="lastName"
          label="Last Name"
          placeholder="How about your last name?"
        />
        <LabeledTextField
          name="email"
          label="Email"
          placeholder="Don't worry no spam. Promise."
        />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Don't forget this!"
          type="password"
        />
        <LabeledTextField
          name="passwordConfirmation"
          label="Confirm password"
          placeholder="Just checking."
          type="password"
        />
      </Form>
      <Link href="/">Home</Link>
    </Container>
  );
};
