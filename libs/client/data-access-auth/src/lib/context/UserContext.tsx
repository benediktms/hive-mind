import { fetcher } from '../helpers/fetcher';
import { CurrentUser } from '@grp-org/shared';
import { useRouter } from 'next/router';
import { createContext, FC, useContext, useEffect, useState } from 'react';

export interface UserContext {
  user?: CurrentUser;
  setUser: (user?: CurrentUser) => void;
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: any;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = createContext<UserContext>(null!);

export function useCurrentUser() {
  return useContext(UserContext);
}

export const CurrentUserProvider: FC<Props> = ({ children, pageProps }) => {
  const [user, setUser] = useState(pageProps?.user);
  const router = useRouter();

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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
