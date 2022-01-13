import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

type AuthHeaders = {
  Authorization: string;
};

export const createApolloClient = (headers: AuthHeaders) => {
  const graphqlEndpoint = new URL(
    '/graphql',
    process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3001'
  );

  const link = new HttpLink({
    uri: graphqlEndpoint.href,
    headers,
    credentials: 'include',
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};
