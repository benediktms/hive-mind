import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import { useGetRefreshToken } from './useGetRefreshToken';

export type Token = string | null;

export const useProvideAuth = () => {
  const [token, setToken] = useState<Token>(null);

  useGetRefreshToken(setToken);

  const isAuthenticated = () => !!token;

  const getAuthHeaders = () => {
    if (!token) return null;

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const createApolloClient = () => {
    const apiUrl = process.env['NEXT_PUBLIC_API_URI'];
    const graphqlEndpoint = new URL('/graphql', apiUrl);

    const link = new HttpLink({
      uri: graphqlEndpoint.href,
      headers: getAuthHeaders(),
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
