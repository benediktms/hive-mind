import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { AuthProvider, useProvideAuth } from '@grp-org/client-data-access-auth';
import { ApolloProvider } from '@apollo/client';

function CustomApp({ Component, pageProps }: AppProps) {
  const { createApolloClient } = useProvideAuth();

  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <AuthProvider>
        <ApolloProvider client={createApolloClient()}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default CustomApp;
