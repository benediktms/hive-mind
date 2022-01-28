import { withApollo } from '@hive-mind/client-data-access-gql';
import { LoginPage } from '@hive-mind/client/views';
import React from 'react';

export function Login() {
  return <LoginPage />;
}

export default withApollo({ ssr: false })(Login);
