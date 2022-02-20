import {
  FormLayout,
  ResetPasswordForm,
} from '@hive-mind/client-data-access-auth';
import { withApollo } from '@hive-mind/client-data-access-gql';
import { useRouter } from 'next/router';

const Reset = () => {
  const router = useRouter();
  const { token, email } = router.query;

  return (
    <FormLayout forPage="reset-password">
      <ResetPasswordForm email={email as string} token={token as string} />
    </FormLayout>
  );
};

export default withApollo({ ssr: false })(Reset);
