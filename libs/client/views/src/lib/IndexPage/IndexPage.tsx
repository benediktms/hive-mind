import { Container, Heading, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '@grp-org/client-data-access-gql';
import { useRouter } from 'next/router';

export const IndexPage = () => {
  const router = useRouter();
  const [logoutMutation, { loading: logoutLoding }] = useLogoutMutation();
  const { data, error } = useCurrentUserQuery();
  const isAuthenticated: boolean = !!data && !error;

  return (
    <Container>
      <Heading>index</Heading>

      <Grid gap={2}>
        <GridItem>
          <Button
            colorScheme="purple"
            isDisabled={isAuthenticated}
            onClick={async () => await router.push('/login')}
            w="100%"
          >
            Login
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="purple"
            isDisabled={isAuthenticated}
            onClick={async () => await router.push('/register')}
            w="100%"
          >
            Register
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="purple"
            isDisabled={!isAuthenticated}
            onClick={async () => await router.push('/uptime')}
            w="100%"
          >
            Uptime
          </Button>
          <Button
            colorScheme="purple"
            isDisabled={!isAuthenticated}
            isLoading={logoutLoding}
            onClick={async () => {
              await logoutMutation();
              await router.replace('/');
              window.location.reload();
            }}
            w="100%"
            mt={2}
          >
            Logout
          </Button>
          <Button
            colorScheme="purple"
            isDisabled={!isAuthenticated}
            onClick={async () => {
              await router.push('/me');
            }}
            w="100%"
            mt={2}
          >
            Me
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
};
