import { Container, Grid, Button, Typography } from '@mui/material';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '@hive-mind/client-data-access-gql';
import { useRouter } from 'next/router';

export const IndexPage = () => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const { data, error } = useCurrentUserQuery();
  const isAuthenticated: boolean = !!data && !error;

  return (
    <Container>
      <Typography variant="h2">index</Typography>

      <Grid container gap={2}>
        <Grid item>
          <Button
            disabled={isAuthenticated}
            onClick={async () => await router.push('/login')}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={isAuthenticated}
            onClick={async () => await router.push('/register')}
          >
            Register
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={!isAuthenticated}
            onClick={async () => await router.push('/uptime')}
          >
            Uptime
          </Button>
          <Button
            disabled={!isAuthenticated}
            // isLoading={logoutLoding}
            onClick={async () => {
              await logoutMutation();
              await router.replace('/');
              window.location.reload();
            }}
          >
            Logout
          </Button>
          <Button
            disabled={!isAuthenticated}
            onClick={async () => {
              await router.push('/me');
            }}
          >
            Me
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
