import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hive Mind</title>
      </Head>

      <>
        <CssBaseline />
        <Component {...pageProps} />
      </>
    </>
  );
}

export default CustomApp;
