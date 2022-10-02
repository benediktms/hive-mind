import { useLogoutMutation } from '@hive-mind/client-data-access-gql';
import { useRouter } from 'next/router';
import { useCurrentUserStore } from '@hive-mind/client-data-access-auth';
import { Box, Button, Container, Typography } from '@mui/material';

export const IndexPage = () => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const { currentUser } = useCurrentUserStore(state => state);
  const isAuthenticated = !!currentUser;

  return (
    <Container maxWidth="md">
      <Typography variant="h2">index</Typography>

      <Box
        display="flex"
        flexDirection="column"
        sx={{
          '& > * ': {
            marginY: '0.3em',
          },
        }}
      >
        <Button
          variant="contained"
          disabled={isAuthenticated}
          onClick={async () => await router.push('/login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          disabled={isAuthenticated}
          onClick={async () => await router.push('/register')}
        >
          Register
        </Button>
        <Button
          variant="contained"
          disabled={!isAuthenticated}
          onClick={async () => await router.push('/uptime')}
        >
          Uptime
        </Button>
        <Button
          variant="contained"
          disabled={!isAuthenticated}
          onClick={async () => {
            await logoutMutation();
            await router.replace('/');
            window.location.reload();
          }}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          disabled={!isAuthenticated}
          onClick={async () => {
            await router.push('/me');
          }}
        >
          Me
        </Button>
      </Box>
    </Container>
  );
};
