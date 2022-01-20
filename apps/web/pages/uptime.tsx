import { WithUser } from '@grp-org/client-data-access-auth';
import { useUptimeQuery, withApollo } from '@grp-org/client-data-access-gql';
import Link from 'next/link';
import React from 'react';

export const Uptime = () => {
  const { data, loading, error } = useUptimeQuery();

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return (
      <div>
        Error: {error.message}
        <br />
        <Link href="/">Home</Link>
      </div>
    );
  } else if (!data) {
    return (
      <div>
        No data
        <br />
        <Link href="/">Home</Link>
      </div>
    );
  }

  return (
    <WithUser>
      {data.uptime}
      <br />
      <Link href="/">Home</Link>
    </WithUser>
  );
};

export default withApollo({ ssr: false })(Uptime);
