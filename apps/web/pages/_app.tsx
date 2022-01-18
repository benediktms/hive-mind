import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  AuthProvider,
  useProvideAuth,
  CurrentUserProvider,
} from '@grp-org/client-data-access-auth';
import { createApolloClient } from '@grp-org/client-data-access-gql';

function CustomApp({ Component, pageProps }: AppProps) {
  const { getAuthHeaders } = useProvideAuth();
  const client = createApolloClient(getAuthHeaders());

  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <CurrentUserProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </ApolloProvider>
        </AuthProvider>
      </CurrentUserProvider>
    </>
  );
}

export default CustomApp;
