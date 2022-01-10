import { createContext } from 'react';
import { Token, useProvideAuth } from '../hooks/useProvideAuth';

type AuthContext = {
  token: Token;
  setToken: (newToken: Token) => void;
};

export const AuthContext = createContext<AuthContext>({
  token: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: (_newToken: Token) => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
