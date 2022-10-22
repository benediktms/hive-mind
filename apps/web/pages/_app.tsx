import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { NotificationWrapper } from '@hive-mind/client-notifications';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hive Mind</title>
      </Head>

      <>
        <CssBaseline />
        <NotificationWrapper>
          <Component {...pageProps} />
        </NotificationWrapper>
      </>
    </>
  );
}

export default CustomApp;
