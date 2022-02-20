import { useToast } from '@chakra-ui/react';
import {
  RegisterInput,
  useRegisterMutation,
} from '@hive-mind/client-data-access-gql';
import { Form, LabeledTextField } from '@hive-mind/client-ui-form';
import { RegisterSchema } from '@hive-mind/client/validation';
import { useRouter } from 'next/router';

export const RegisterForm = () => {
  const [registerMutation] = useRegisterMutation();
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (input: RegisterInput) => {
    try {
      const { data, errors } = await registerMutation({
        variables: { input },
      });

      if (data) {
        toast({
          status: 'success',
          title: 'Account creation successfull',
          description: 'Welcome to the party! You are now ready to use grp',
        });

        await router.push('/confirm');
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
  );
};
