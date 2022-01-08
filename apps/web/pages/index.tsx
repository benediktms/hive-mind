import { Button, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export function Index() {
  const router = useRouter();

  const goToRegister = async () => {
    await router.push('/register');
  };

  const goToLogin = async () => {
    await router.push('/login');
  };

  return (
    <Container>
      <Heading>index</Heading>

      <Grid gap={2}>
        <GridItem>
          <Button colorScheme="purple" onClick={goToLogin} w="100%">
            Login
          </Button>
        </GridItem>
        <GridItem>
          <Button colorScheme="purple" onClick={goToRegister} w="100%">
            Register
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Index;
