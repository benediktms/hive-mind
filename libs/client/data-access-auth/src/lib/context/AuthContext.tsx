import { createContext, useState } from 'react';

export type Token = string | undefined;

type AuthContext = {
  token: Token;
  setToken: (newToken: Token) => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContext>(null!);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<Token>();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
