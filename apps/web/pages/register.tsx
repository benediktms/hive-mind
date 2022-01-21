import { withApollo } from '@grp-org/client-data-access-gql';
import { RegisterPage } from '@grp-org/client/views';
import React from 'react';

export function Register() {
  return <RegisterPage />;
}

export default withApollo({ ssr: false })(Register);
