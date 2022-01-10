import { Button, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export function Index() {
  const router = useRouter();

  return (
    <Container>
      <Heading>index</Heading>

      <Grid gap={2}>
        <GridItem>
          <Button
            colorScheme="purple"
            onClick={async () => await router.push('/login')}
            w="100%"
          >
            Login
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="purple"
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
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Index;
