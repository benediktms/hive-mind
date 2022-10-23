import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import { FC, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Box, IconButton, Button, Typography } from '@mui/material';

type Props = {
  forPage: 'signup' | 'login' | 'forgot-password' | 'reset-password';
};

function getPageHeading(title: Props['forPage']): string {
  switch (title) {
    case 'signup':
      return 'Sign up';
    case 'login':
      return 'Login';
    case 'forgot-password':
    case 'reset-password':
      return 'Reset Password';
    default:
      throw Error('Unknown page title');
  }
}

export const FormLayout: FC<PropsWithChildren<Props>> = ({
  forPage,
  children,
}) => {
  const router = useRouter();

  return (
    <Box mx="30%" maxWidth={400}>
      <Typography variant="h1" textAlign="center" my={5}>
        {getPageHeading(forPage)}
      </Typography>

      {children}

      <Box my={3}>
        <IconButton sx={{ mr: 2 }} onClick={() => router.push('/')}>
          <BiArrowBack />
        </IconButton>

        {forPage === 'login' && (
          <Button
            variant="outlined"
            onClick={async () => await router.push('/register')}
          >
            Sign up
          </Button>
        )}

        {forPage === 'signup' && (
          <Button
            variant="outlined"
            onClick={async () => await router.push('/login')}
          >
            Login
          </Button>
        )}
      </Box>
      {forPage !== 'forgot-password' && forPage !== 'reset-password' && (
        <Typography align="center">
          <NextLink href="/forgot-password">Forgot Password?</NextLink>
        </Typography>
      )}
    </Box>
  );
};
