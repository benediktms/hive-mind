import { withApollo } from '@grp-org/client-data-access-gql';
import { IndexPage } from '@grp-org/client/views';
import React from 'react';

export function Index() {
  return <IndexPage />;
}

export default withApollo(Index);
