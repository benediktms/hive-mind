import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

export const createApolloClient = (_ctx: NextPageContext) => {
  const graphqlEndpoint = new URL('/graphql', process.env.NEXT_PUBLIC_API_URI);
  const isServer = typeof window === 'undefined';

  return new ApolloClient({
    uri: graphqlEndpoint.href,
    cache: new InMemoryCache(),
    credentials: 'include',
    ssrMode: isServer,
  });
};

export const withApollo = createWithApollo(createApolloClient);
