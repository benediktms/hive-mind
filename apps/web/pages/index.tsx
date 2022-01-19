import { useCurrentUser } from '@grp-org/client-data-access-auth';
import { withApollo } from '@grp-org/client-data-access-gql';
import { IndexPage } from '@grp-org/client/views';
import React from 'react';

export function Index() {
  const { user } = useCurrentUser();

  return (
    <>
      {user ? <div>{user.firstName} </div> : <div>Loading...</div>}
      <IndexPage />
    </>
  );
}

export default withApollo({ ssr: true })(Index);
