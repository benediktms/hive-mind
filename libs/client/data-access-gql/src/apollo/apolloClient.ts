import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

// const isServer = typeof window === 'undefined';

export const createApolloClient = (_ctx: NextPageContext) => {
  const graphqlEndpoint = new URL('/graphql', process.env.NEXT_PUBLIC_API_URI);

  // const link = new HttpLink({
  //   uri: graphqlEndpoint.href,
  //   // headers: {
  //   //   cookie: (isServer ? ctx?.req?.headers.cookie : undefined) || '',
  //   // },
  //   // credentials: 'include',
  // });

  return new ApolloClient({
    // link,
    uri: graphqlEndpoint.href,
    cache: new InMemoryCache(),
    credentials: 'include',
    // ssrMode: isServer,
  });
};

export const withApollo = createWithApollo(createApolloClient);
