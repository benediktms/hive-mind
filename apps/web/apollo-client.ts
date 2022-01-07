import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUri = process.env.API_URI || 'http://localhost:3001/';
const graphqlUri = new URL('/graphql', apiUri);

const apolloClient = new ApolloClient({
  uri: graphqlUri.href,
  cache: new InMemoryCache(),
});

export default apolloClient;
