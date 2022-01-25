import { withApollo } from '@grp-org/client-data-access-gql';
import { LoginPage } from '@grp-org/client/views';
import React from 'react';

export function Login() {
  return <LoginPage />;
}

export default withApollo(Login);
