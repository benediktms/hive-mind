import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';
import { API_URL, GQL_URL } from '../constants';

export type Token = string | null;

export const useProvideAuth = () => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    fetch(`${API_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const { accessToken } = await res.json();
        console.log(accessToken);
        setToken(accessToken);
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
    const link = new HttpLink({
      uri: GQL_URL.href,
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
