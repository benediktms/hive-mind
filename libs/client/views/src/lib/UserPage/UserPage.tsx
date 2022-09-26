import { useCurrentUserStore } from '@hive-mind/client-data-access-auth';
import Link from 'next/link';

export const UserPage = () => {
  const currentUser = useCurrentUserStore(state => state.currentUser);

  return (
    <>
      <h1>Me</h1>
      <div>{currentUser?.firstName}</div>
      <Link href="/">Home</Link>
    </>
  );
};
