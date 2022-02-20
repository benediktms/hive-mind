import { withApollo } from '@hive-mind/client-data-access-gql';
import { RequestResetPage } from '@hive-mind/client/views';
import React from 'react';

export const ForgotPassword = () => {
  return <RequestResetPage />;
};

export default withApollo({ ssr: false })(ForgotPassword);
