import { useCurrentUserQuery } from '@hive-mind/client-data-access-gql';
import { getErrorMessage } from '@hive-mind/shared';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useCurrentUserStore } from '../stores/currentUserStore';

export const WithUser: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { data, error, loading } = useCurrentUserQuery();
  const { currentUser, setCurrentUser } = useCurrentUserStore(state => state);

  useEffect(() => {
    if (error) {
      setCurrentUser(null);
      router.push('/login').catch(e => console.log(e));
    }

    if (!data) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URI}/refresh_token`, undefined, {
          withCredentials: true,
        })
        .then(async () => {
          // TODO: get the next destination url and redirect to it somehow
        })
        .catch(async err => {
          console.log(getErrorMessage(err));
          await router.push('/login');
        });
    } else {
      setCurrentUser(data.currentUser);
    }
  }, [currentUser, data, error, loading, router, setCurrentUser]);

  if (!data || error) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <div>{children}</div>;
};
