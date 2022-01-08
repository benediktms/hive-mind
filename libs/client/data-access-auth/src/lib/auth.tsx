import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { createContext, useContext, useState } from 'react';

export type Token = string | null;

type AuthContext = {
  setToken: (newToken: Token) => void;
};

const AuthContext = createContext<AuthContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: (_newToken: Token) => {},
});

export const useProvideAuth = () => {
  const [token, setToken] = useState<Token>(null);

  const isAuthenticated = () => {
    return !!token;
  };

  const getAuthHeaders = () => {
    if (!token) return null;

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const apiUri = process.env['API_URI'] || 'http://localhost:3001/';
  const graphqlUri = new URL('/graphql', apiUri);

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: graphqlUri.href,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  return {
    setToken,
    isAuthenticated,
    createApolloClient,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
