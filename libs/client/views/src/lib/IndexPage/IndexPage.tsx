import { Container, Heading, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useProvideAuth } from '@grp-org/client-data-access-auth';
import { useLogoutMutation } from '@grp-org/client-data-access-gql';
import { useRouter } from 'next/router';

export const IndexPage = () => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const { isAuthenticated, setToken } = useProvideAuth();

  return (
    <Container>
      <Heading>index</Heading>

      <Grid gap={2}>
        <GridItem>
          <Button
            colorScheme="purple"
            isDisabled={isAuthenticated()}
            onClick={async () => await router.push('/login')}
            w="100%"
          >
            Login
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="purple"
            isDisabled={isAuthenticated()}
            onClick={async () => await router.push('/register')}
            w="100%"
          >
            Register
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="purple"
            onClick={async () => await router.push('/uptime')}
            w="100%"
          >
            Uptime
          </Button>
          <Button
            colorScheme="purple"
            isDisabled={!isAuthenticated()}
            onClick={async () => {
              setToken(null);
              await logoutMutation();
            }}
            w="100%"
            mt={2}
          >
            Logout
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
};
