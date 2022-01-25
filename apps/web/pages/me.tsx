import { WithUser } from '@grp-org/client-data-access-auth';
import {
  useCurrentUserQuery,
  withApollo,
} from '@grp-org/client-data-access-gql';
import Link from 'next/link';
import React from 'react';

function Me() {
  const { data, loading, error } = useCurrentUserQuery();

  return (
    <WithUser>
      <h1>Me</h1>
      {loading && <div>Loading...</div>}
      {(error || !data) && <div>Something went wrong</div>}
      {data && <div>{data.currentUser.firstName}</div>}
      <Link href="/">Home</Link>
    </WithUser>
  );
}

export default withApollo(Me);
