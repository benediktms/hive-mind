import { fetcher, useCurrentUser } from '@grp-org/client-data-access-auth';
import { CurrentUser } from '@grp-org/shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Me() {
  const { user, setUser } = useCurrentUser();
  const router = useRouter();

  // TODO: move this up the component tree to set the token for the apollo provider
  // Investigate how this will have to be handled with the token refresh system
  const getCurrentUser = async () => {
    const [error, user] = await fetcher<CurrentUser>(
      `${process.env.NEXT_PUBLIC_API_URI}/me`
    );

    if (!error && user) {
      setUser(user);
    } else {
      await router.push('/');
    }
  };

  useEffect(() => {
    if (!user) {
      void getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <h1>Me</h1>
      {user ? <div>{user.firstName} </div> : <div>Loading...</div>}
    </div>
  );
}
