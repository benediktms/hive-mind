import { CurrentUser } from '@grp-org/shared';
import { createContext, FC, useContext, useState } from 'react';

export interface UserContext {
  user?: CurrentUser;
  setUser: (user?: CurrentUser) => void;
}

type Props = {
  initialUser?: CurrentUser;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = createContext<UserContext>(null!);

export function useCurrentUser() {
  return useContext(UserContext);
}

export const CurrentUserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
