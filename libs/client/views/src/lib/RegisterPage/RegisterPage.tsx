import { FormLayout, RegisterForm } from '@hive-mind/client-data-access-auth';

export const RegisterPage = () => {
  return (
    <FormLayout forPage="signup">
      <RegisterForm />
    </FormLayout>
  );
};
