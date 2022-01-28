import { WithUser } from '@hive-mind/client-data-access-auth';
import { useUptimeQuery, withApollo } from '@hive-mind/client-data-access-gql';
import Link from 'next/link';
import React from 'react';

export const Uptime = () => {
  const {
    data: uptimeData,
    loading: loadingUptime,
    error: uptimeError,
  } = useUptimeQuery();

  if (loadingUptime) {
    return <div>Loading...</div>;
  } else if (uptimeError) {
    return (
      <div>
        Error: {uptimeError.message}
        <br />
        <Link href="/">Home</Link>
      </div>
    );
  } else if (!uptimeData) {
    return (
      <div>
        No data
        <br />
        <Link href="/">Home</Link>
      </div>
    );
  }

  return (
    <>
      {uptimeData.uptime}
      <br />
      <Link href="/">Home</Link>
    </>
  );
};

const OuterUptime = () => {
  return (
    <WithUser>
      <Uptime />
    </WithUser>
  );
};

export default withApollo({ ssr: false })(OuterUptime);
