import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { CurrentUserProvider } from '@grp-org/client-data-access-auth';

function CustomApp({ Component, pageProps }: AppProps) {
  // const { getAuthHeaders } = useProvideAuth();
  // const client = createApolloClient(getAuthHeaders());

  return (
    <>
      <Head>
        <title>grp</title>
      </Head>

      <CurrentUserProvider pageProps={pageProps}>
        {/* <AuthProvider> */}
        {/* <ApolloProvider client={apolloClient}> */}
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        {/* </ApolloProvider> */}
        {/* </AuthProvider> */}
      </CurrentUserProvider>
    </>
  );
}

export default CustomApp;
