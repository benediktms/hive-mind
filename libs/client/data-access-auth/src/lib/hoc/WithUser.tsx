import { useCurrentUserQuery } from '@hive-mind/client-data-access-gql';
import { getErrorMessage } from '@hive-mind/shared';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

export const WithUser: FC<Props> = ({ children }) => {
  const { data, error, loading } = useCurrentUserQuery();
  const router = useRouter();
  const isUnauthenticated = !!error || !data;

  useEffect(() => {
    if (!loading && isUnauthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const request: any = axios
        .post(`${process.env.NEXT_PUBLIC_API_URI}/refresh_token`, undefined, {
          withCredentials: true,
        })
        .catch(async (err) => {
          console.log(getErrorMessage(err));
          await router.push('/login');
        });

      const { data } = request;

      if (!data) {
        void router.push('/login');
      }
    }
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
