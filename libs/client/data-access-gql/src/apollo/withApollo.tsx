import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { withApollo as _withApollo } from './apollo';

export const withApollo = _withApollo(
  ({ initialState }) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      uri: `${process.env.NEXT_PUBLIC_API_URI}/graphql`,
      credentials: 'include',
      link: createHttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URI}/graphql`,
        credentials: 'include',
        fetch,
      }),
    }),
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
