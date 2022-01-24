import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

const isServer = typeof window === 'undefined';

export const createApolloClient = (ctx: NextPageContext) => {
  const graphqlEndpoint = new URL('/graphql', process.env.NEXT_PUBLIC_API_URI);

  const link = new HttpLink({
    uri: graphqlEndpoint.href,
    headers: {
      Cookie: (isServer ? ctx?.req?.headers.cookie : undefined) || '',
    },
    credentials: 'include',
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: isServer,
  });
};

export const withApollo = createWithApollo(createApolloClient);
