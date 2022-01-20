import { useCurrentUser } from '../context/UserContext';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

export const WithUser: FC = ({ children }) => {
  const { user } = useCurrentUser();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) void router.replace('/');
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
