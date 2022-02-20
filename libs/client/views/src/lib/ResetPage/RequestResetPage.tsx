import {
  FormLayout,
  RequestResetForm,
} from '@hive-mind/client-data-access-auth';

export const RequestResetPage = () => {
  return (
    <FormLayout forPage="forgot-password">
      <RequestResetForm />
    </FormLayout>
  );
};
