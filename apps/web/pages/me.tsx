import { fetcher, useCurrentUser } from '@grp-org/client-data-access-auth';
import { CurrentUser } from '@grp-org/shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type UserAndToken = {
  user: CurrentUser;
  token: string;
};

export default function Me() {
  const { user, setUser } = useCurrentUser();
  const router = useRouter();

  const getUserAndToken = async () => {
    const [error, data] = await fetcher<UserAndToken>(
      `${process.env.NEXT_PUBLIC_API_URI}/me`
    );

    console.log(data, error);

    if (!error && data) {
      console.log('setting user');
      setUser(data.user);
    } else {
      console.log('redirecting');
      await router.push('/');
    }
  };

  useEffect(() => {
    if (!user) {
      void getUserAndToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Me</h1>
    </div>
  );
}
