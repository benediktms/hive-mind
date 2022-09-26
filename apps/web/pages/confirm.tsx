import {
  useConfirmEmailMutation,
  withApollo,
} from '@hive-mind/client-data-access-gql';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export function ConfirmAccount() {
  const router = useRouter();
  const { token, email } = router.query;
  const [confirmEmail] = useConfirmEmailMutation();

  useEffect(() => {
    if (token && email) {
      confirmEmail({
        variables: {
          input: { email: email as string, token: token as string },
        },
      })
        .then(() => {
          setTimeout(() => {
            void router.push('/me');
          }, 3000);
        })
        .catch(e => {
          console.log(e);
        });
    }
  });

  return (
    <Container>
      {(!token || !email) && (
        <Typography variant="h1">
          Please check your email to confirm your account
        </Typography>
      )}
      {token && email && (
        <>
          <Typography variant="h1">Thanks for joining Hive Mind!</Typography>
          <Typography>You will be redirected shortly</Typography>
        </>
      )}

      <Link href="/">Home</Link>
    </Container>
  );
}

export default withApollo({ ssr: false })(ConfirmAccount);
