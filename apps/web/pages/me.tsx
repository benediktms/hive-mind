import { WithUser } from '@hive-mind/client-data-access-auth';
import { withApollo } from '@hive-mind/client-data-access-gql';
import { UserPage } from '@hive-mind/client/views';
import React from 'react';

function Me() {
  return (
    <WithUser>
      <UserPage />
    </WithUser>
  );
}

export default withApollo({ ssr: false })(Me);
