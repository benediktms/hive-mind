import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';

export type Token = string | null;

export const useProvideAuth = () => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    const apiUrl =
      process.env['NEXT_PUBLIC_API_URI'] || 'http://localhost:3001';

    fetch(`${apiUrl}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const { ok, accessToken } = await res.json();

        if (ok && !!accessToken.length) {
          setToken(accessToken);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const isAuthenticated = () => !!token;

  const getAuthHeaders = () => {
    if (!token) return null;

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const createApolloClient = () => {
    const apiUrl =
      process.env['NEXT_PUBLIC_API_URI'] || 'http://localhost:3001';
    const graphqlEndpoint = new URL('/graphql', apiUrl);

    const link = new HttpLink({
      uri: graphqlEndpoint.href,
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  return {
    token,
    setToken,
    isAuthenticated,
    createApolloClient,
  };
};
