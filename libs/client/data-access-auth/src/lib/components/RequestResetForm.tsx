import { useToast } from '@chakra-ui/react';
import {
  RequestPasswordResetInput,
  useRequestResetMutation,
} from '@hive-mind/client-data-access-gql';
import { Form, LabeledTextField } from '@hive-mind/client-ui-form';
import { RequestResetSchema } from '@hive-mind/client/validation';
import { normalizeError } from '@hive-mind/shared';

export const RequestResetForm = () => {
  const [requestResetMutation] = useRequestResetMutation();
  const toast = useToast();

  const handleSubmit = async (input: RequestPasswordResetInput) => {
    try {
      const { data, errors } = await requestResetMutation({
        variables: { input },
      });

      if (data) {
        toast({
          status: 'success',
          title: 'Password reset email was sent',
          description: 'Please check your email and follow the instructions',
        });
      } else {
        throw errors;
      }
    } catch (e) {
      const error = normalizeError(e);
      console.log(e);
      toast({
        status: 'error',
        title: 'Something went wrong',
        description: error.message,
      });
    }
  };

  return (
    <Form
      submitText="Request Password Reset"
      schema={RequestResetSchema}
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
    >
      <LabeledTextField
        name="email"
        label="Email"
        placeholder="Please enter your email"
      />
    </Form>
  );
};
