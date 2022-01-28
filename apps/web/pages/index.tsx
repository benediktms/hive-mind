import { withApollo } from '@hive-mind/client-data-access-gql';
import { IndexPage } from '@hive-mind/client/views';
import React from 'react';

export function Index() {
  return <IndexPage />;
}

export default withApollo({ ssr: false })(Index);
