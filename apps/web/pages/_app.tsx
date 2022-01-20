import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { CurrentUserProvider } from '@grp-org/client-data-access-auth';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>grp</title>
      </Head>

      <CurrentUserProvider pageProps={pageProps}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CurrentUserProvider>
    </>
  );
}

export default CustomApp;
