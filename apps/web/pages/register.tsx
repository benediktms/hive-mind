import { withApollo } from '@hive-mind/client-data-access-gql';
import { RegisterPage } from '@hive-mind/client/views';
import React from 'react';

export function Register() {
  return <RegisterPage />;
}

export default withApollo({ ssr: false })(Register);
